export type LeadFormType = 'contact' | 'enquiry';

export interface ContactLeadPayload {
  fullName: string;
  mobile: string;
  email?: string;
  projectBrief: string;
  source?: string;
  pageUrl?: string;
  leadId?: string;
}

export interface WebsiteEnquiryPayload {
  leadId?: string;
  packageName: string;
  industry: string;
  clientName: string;
  phone: string;
  email?: string;
  city?: string;
  currentUrl?: string;
  primaryGoals: string;
  contentSize: string;
  industrySpecifics: string;
  leadAutomation: string;
  alertChannel: string;
  updateMethod: string;
  visualStyle: string;
  language: string;
  assetsReady: string;
  seoKeywords?: string;
  gbpSetup: string;
  references?: string;
  goLiveWindow: string;
  budgetRange: string;
  workflowTerms: string;
  additionalNotes?: string;
  submittedVia: string;
}

export interface LeadSubmitResponse {
  ok: boolean;
  mode?: 'live' | 'demo';
  leadId?: string;
  message: string;
  error?: string;
}

export const LEADS_API_ENDPOINT = '/api/leads';
const REQUEST_TIMEOUT_MS = 12000;

export async function submitLead(
  formType: 'contact',
  data: ContactLeadPayload
): Promise<LeadSubmitResponse>;
export async function submitLead(
  formType: 'enquiry',
  data: WebsiteEnquiryPayload
): Promise<LeadSubmitResponse>;
export async function submitLead(
  formType: LeadFormType,
  data: ContactLeadPayload | WebsiteEnquiryPayload
): Promise<LeadSubmitResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(LEADS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        ...data,
      }),
      signal: controller.signal,
    });

    const json = (await response.json()) as LeadSubmitResponse;
    if (!response.ok) {
      return {
        ok: false,
        message: json.message || json.error || 'Could not submit right now. Please try again.',
        error: json.error,
      };
    }

    return json;
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    return {
      ok: false,
      message: isAbort
        ? 'Request timed out. You can also send your brief directly on WhatsApp.'
        : 'Network error while saving your request. Please try again or use WhatsApp.',
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
