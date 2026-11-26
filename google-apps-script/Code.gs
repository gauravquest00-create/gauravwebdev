/**
 * Google Apps Script (Code.gs) for Gaurav Verma Portfolio Lead Sync
 * Supports two tabs automatically:
 *   1. Contact_Leads
 *   2. Website_Enquiries
 *
 * Deploy as: Web App -> Execute as: Me -> Who has access: Anyone
 * Paste the generated /exec URL into .env.local as GOOGLE_SHEET_WEB_APP_URL.
 */

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(raw);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.formType === 'contact') {
      var contactSheet = getOrCreateSheet(ss, 'Contact_Leads', [
        'Submitted At',
        'Lead ID',
        'Full Name',
        'Mobile',
        'Email',
        'Project Brief',
        'Source',
        'Page URL',
      ]);

      contactSheet.appendRow([
        data.submittedAt || new Date().toISOString(),
        data.leadId || '',
        data.fullName || '',
        data.mobile || '',
        data.email || '',
        data.projectBrief || '',
        data.source || '',
        data.pageUrl || '',
      ]);

      return jsonResponse({ ok: true, tab: 'Contact_Leads', leadId: data.leadId || '' });
    }

    if (data.formType === 'enquiry') {
      var enquirySheet = getOrCreateSheet(ss, 'Website_Enquiries', [
        'Submitted At',
        'Lead ID',
        'Package Name',
        'Industry',
        'Client Name',
        'Phone',
        'Email',
        'City',
        'Current URL',
        'Primary Goals',
        'Content Size',
        'Industry Specifics',
        'Lead Automation',
        'Alert Channel',
        'Update Method',
        'Visual Style',
        'Language',
        'Assets Ready',
        'SEO Keywords',
        'GBP Setup',
        'References',
        'Go-Live Window',
        'Budget Range',
        'Workflow Terms',
        'Additional Notes',
        'Submitted Via',
      ]);

      enquirySheet.appendRow([
        data.submittedAt || new Date().toISOString(),
        data.leadId || '',
        data.packageName || '',
        data.industry || '',
        data.clientName || '',
        data.phone || '',
        data.email || '',
        data.city || '',
        data.currentUrl || '',
        data.primaryGoals || '',
        data.contentSize || '',
        data.industrySpecifics || '',
        data.leadAutomation || '',
        data.alertChannel || '',
        data.updateMethod || '',
        data.visualStyle || '',
        data.language || '',
        data.assetsReady || '',
        data.seoKeywords || '',
        data.gbpSetup || '',
        data.references || '',
        data.goLiveWindow || '',
        data.budgetRange || '',
        data.workflowTerms || '',
        data.additionalNotes || '',
        data.submittedVia || '',
      ]);

      return jsonResponse({ ok: true, tab: 'Website_Enquiries', leadId: data.leadId || '' });
    }

    return jsonResponse({ ok: false, error: 'Unsupported formType' });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
