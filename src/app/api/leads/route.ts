import { NextRequest, NextResponse } from 'next/server';
import {
  generateLeadId,
  isEnglishOnly,
  isValidEmail,
  isValidIndianMobile,
  sanitizeMobileInput,
} from '@/lib/validation';

function isSheetConfigured(url: string | undefined): url is string {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith('https://script.google.com/macros/s/')) return false;
  if (trimmed.includes('YOUR_DEPLOYMENT_ID')) return false;
  return true;
}

export async function GET() {
  const configured = isSheetConfigured(process.env.GOOGLE_SHEET_WEB_APP_URL);
  return NextResponse.json({
    status: 'ok',
    sheetConfigured: configured,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const formType = body.formType;

    if (formType !== 'contact' && formType !== 'enquiry') {
      return NextResponse.json(
        { ok: false, error: 'Invalid formType. Expected "contact" or "enquiry".' },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();

    if (formType === 'contact') {
      const fullName = String(body.fullName ?? '').trim();
      const mobile = sanitizeMobileInput(String(body.mobile ?? ''));
      const email = String(body.email ?? '').trim();
      const projectBrief = String(body.projectBrief ?? '').trim();

      if (fullName.length < 2 || !isEnglishOnly(fullName)) {
        return NextResponse.json(
          { ok: false, error: 'Please provide a valid full name in English.' },
          { status: 400 }
        );
      }

      if (!isValidIndianMobile(mobile)) {
        return NextResponse.json(
          { ok: false, error: 'Please provide a valid 10-digit Indian mobile number.' },
          { status: 400 }
        );
      }

      if (email && !isValidEmail(email)) {
        return NextResponse.json(
          { ok: false, error: 'Please provide a valid email address.' },
          { status: 400 }
        );
      }

      if (projectBrief.length < 10 || !isEnglishOnly(projectBrief)) {
        return NextResponse.json(
          { ok: false, error: 'Please provide a short English project brief (min 10 chars).' },
          { status: 400 }
        );
      }

      const leadId = String(body.leadId ?? '').trim() || generateLeadId('CNT');

      const forwardPayload = {
        formType: 'contact',
        leadId,
        submittedAt,
        fullName,
        mobile,
        email,
        projectBrief,
        source: String(body.source ?? 'Portfolio Quick Contact'),
        pageUrl: String(body.pageUrl ?? '/'),
      };

      return await forwardToGoogleSheet(forwardPayload, leadId);
    }

    // Enquiry payload validation
    const clientName = String(body.clientName ?? '').trim();
    const phone = sanitizeMobileInput(String(body.phone ?? ''));
    const email = String(body.email ?? '').trim();
    const additionalNotes = String(body.additionalNotes ?? '').trim();

    if (clientName.length < 2 || !isEnglishOnly(clientName)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid name or business name in English.' },
        { status: 400 }
      );
    }

    if (!isValidIndianMobile(phone)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (additionalNotes && !isEnglishOnly(additionalNotes)) {
      return NextResponse.json(
        { ok: false, error: 'Additional notes must use English characters only.' },
        { status: 400 }
      );
    }

    const leadId = String(body.leadId ?? '').trim() || generateLeadId('ENQ');

    const forwardPayload = {
      formType: 'enquiry',
      leadId,
      submittedAt,
      source: 'Portfolio 4-Step Website Enquiry',
      packageName: String(body.packageName ?? ''),
      industry: String(body.industry ?? ''),
      clientName,
      phone,
      email,
      city: String(body.city ?? ''),
      currentUrl: String(body.currentUrl ?? ''),
      primaryGoals: String(body.primaryGoals ?? ''),
      contentSize: String(body.contentSize ?? ''),
      industrySpecifics: String(body.industrySpecifics ?? ''),
      leadAutomation: String(body.leadAutomation ?? ''),
      alertChannel: String(body.alertChannel ?? ''),
      updateMethod: String(body.updateMethod ?? ''),
      visualStyle: String(body.visualStyle ?? ''),
      language: String(body.language ?? ''),
      assetsReady: String(body.assetsReady ?? ''),
      seoKeywords: String(body.seoKeywords ?? ''),
      gbpSetup: String(body.gbpSetup ?? ''),
      references: String(body.references ?? ''),
      goLiveWindow: String(body.goLiveWindow ?? ''),
      budgetRange: String(body.budgetRange ?? ''),
      workflowTerms: String(body.workflowTerms ?? ''),
      additionalNotes,
      submittedVia: String(body.submittedVia ?? 'Direct Form Submit'),
    };

    return await forwardToGoogleSheet(forwardPayload, leadId);
  } catch (err) {
    console.error('[api/leads] Unexpected error:', err);
    return NextResponse.json(
      { ok: false, error: 'Invalid request payload or server error.' },
      { status: 500 }
    );
  }
}

async function forwardToGoogleSheet(
  payload: Record<string, string>,
  leadId: string
): Promise<NextResponse> {
  const webAppUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;

  // Graceful Demo Mode when GOOGLE_SHEET_WEB_APP_URL is not configured yet
  if (!isSheetConfigured(webAppUrl)) {
    return NextResponse.json({
      ok: true,
      mode: 'demo',
      leadId,
      message: `Saved in local demo mode (${leadId}). Add GOOGLE_SHEET_WEB_APP_URL in .env.local to sync live to Google Sheets.`,
    });
  }

  try {
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `Google Apps Script returned HTTP ${response.status}`,
          message: 'Could not reach Google Sheet right now. Please try WhatsApp.',
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      mode: 'live',
      leadId,
      message: `Thank you! Your request (${leadId}) has been saved.`,
    });
  } catch (err) {
    console.error('[api/leads] Google Sheet proxy error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Sheet proxy failed',
        message: 'Could not sync to Google Sheet right now. Please try WhatsApp.',
      },
      { status: 502 }
    );
  }
}
