'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Save,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { PackageSlug, WEBSITE_PACKAGES } from '@/data/packages';
import { useToast } from '@/context/ToastContext';
import { copyToClipboard } from '@/lib/clipboard';
import { submitLead } from '@/lib/sheetConfig';
import {
  isEnglishOnly,
  isValidEmail,
  isValidIndianMobile,
  sanitizeMobileInput,
} from '@/lib/validation';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { LiveBriefSummary } from './LiveBriefSummary';

const DRAFT_STORAGE_KEY = 'gaurav_website_enquiry_draft_v1';

const INDUSTRIES = [
  'Real Estate',
  'Service / Agency',
  'E-commerce / D2C',
  'Clinic / Gym / Local Business',
  'Portfolio / Personal Brand',
  'SaaS / Web App',
  'Other',
] as const;

const PRIMARY_GOALS = [
  'Generate Leads',
  'Build Brand Trust',
  'Sell Products Online',
  'Take Bookings / Appointments',
  'Launch Custom App / MVP',
] as const;

const CONTENT_SIZES = ['Compact', 'Medium', 'Large'] as const;
const LEAD_AUTOMATION_OPTIONS = [
  'Validated Enquiry Form',
  'WhatsApp Click-to-Chat',
  'Save Leads to Google Sheet',
] as const;
const ALERT_CHANNELS = ['WhatsApp', 'Email', 'Both'] as const;
const UPDATE_METHODS = ['Google Sheet', 'Admin Panel', 'Monthly Care'] as const;
const VISUAL_STYLES = [
  'Minimal & Clean',
  'Modern & Bold',
  'Luxury & Editorial',
  'Warm & Friendly',
] as const;
const LANGUAGES = ['English', 'Hindi', 'Bilingual'] as const;
const ASSETS_OPTIONS = [
  'Logo & Brand Colors',
  'Photos / Product Images',
  'Written Copy / Text',
  'Domain / Hosting Ready',
] as const;
const GO_LIVE_WINDOWS = [
  'Urgent: 7–10 days',
  'Standard: 2–3 weeks',
  'Flexible: 1 month+',
] as const;
const BUDGET_RANGES = [
  'Need quote first',
  'Under ₹15k',
  '₹15k – ₹30k',
  '₹30k – ₹60k',
  '₹60k+ / Custom',
] as const;
const WORKFLOW_TERMS = [
  '50% advance to kick off',
  '2 structured revision rounds included',
  'Optional monthly care & updates',
] as const;

const INDUSTRY_SPECIFIC_OPTIONS: Record<string, string[]> = {
  'Real Estate': [
    'RERA Number & Compliance Block',
    'BHK / Budget / Locality Filters',
    'Sold / Featured Property Tags',
    'Downloadable Project Brochures',
    'Locality & Micro-Market Guides',
  ],
  'E-commerce / D2C': [
    'Product Variants (Weight / Size)',
    'Shopping Cart + Quantity Controls',
    'Direct WhatsApp Checkout',
    'UPI / Payment Gateway Ready',
    'Customer Reviews & Purity Badges',
  ],
  'Clinic / Gym / Local Business': [
    'Appointment / Trial Booking Form',
    'Service Menu & Timings Table',
    'Google Maps Directions Embed',
    'Doctor / Trainer Profiles',
    'Before-After / Facility Gallery',
  ],
  default: [
    'Portfolio / Case Study Showcase',
    'Downloadable Company Deck / PDF',
    'Custom Admin Login / Dashboard',
    'Blog or Updates Section',
    'Multi-Step Lead Qualification',
  ],
};

interface EnquiryFormState {
  packageSlug: PackageSlug;
  industry: string;
  clientName: string;
  city: string;
  phone: string;
  email: string;
  currentUrl: string;
  primaryGoals: string[];
  contentSize: (typeof CONTENT_SIZES)[number];
  industrySpecifics: string[];
  leadAutomation: string[];
  alertChannel: (typeof ALERT_CHANNELS)[number];
  updateMethod: (typeof UPDATE_METHODS)[number];
  visualStyle: (typeof VISUAL_STYLES)[number];
  language: (typeof LANGUAGES)[number];
  assetsReady: string[];
  seoKeywords: string;
  gbpSetup: boolean;
  references: string;
  goLiveWindow: (typeof GO_LIVE_WINDOWS)[number];
  budgetRange: (typeof BUDGET_RANGES)[number];
  workflowTerms: string[];
  additionalNotes: string;
}

const DEFAULT_STATE: EnquiryFormState = {
  packageSlug: 'business-growth',
  industry: 'Real Estate',
  clientName: '',
  city: '',
  phone: '',
  email: '',
  currentUrl: '',
  primaryGoals: ['Generate Leads', 'Build Brand Trust'],
  contentSize: 'Medium',
  industrySpecifics: [],
  leadAutomation: ['Validated Enquiry Form', 'WhatsApp Click-to-Chat', 'Save Leads to Google Sheet'],
  alertChannel: 'WhatsApp',
  updateMethod: 'Google Sheet',
  visualStyle: 'Minimal & Clean',
  language: 'English',
  assetsReady: ['Logo & Brand Colors'],
  seoKeywords: '',
  gbpSetup: true,
  references: '',
  goLiveWindow: 'Standard: 2–3 weeks',
  budgetRange: 'Need quote first',
  workflowTerms: [...WORKFLOW_TERMS],
  additionalNotes: '',
};

const STEPS = [
  { num: 1, title: '1. You & Business' },
  { num: 2, title: '2. Scope & Industry' },
  { num: 3, title: '3. Design & SEO' },
  { num: 4, title: '4. Timeline & Launch' },
] as const;

export function GuidedEnquiryWizard() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState<EnquiryFormState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [lastLoggedSignature, setLastLoggedSignature] = useState<string>('');
  const [errors, setErrors] = useState<{
    clientName?: string;
    phone?: string;
    email?: string;
    additionalNotes?: string;
  }>({});

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const notesInputRef = useRef<HTMLTextAreaElement | null>(null);

  // Hydrate from localStorage + URL query params
  useEffect(() => {
    let initial: EnquiryFormState = { ...DEFAULT_STATE };
    try {
      const saved = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<EnquiryFormState>;
        initial = { ...initial, ...parsed };
      }
    } catch {
      // Ignore invalid draft
    }

    const pkgParam = searchParams.get('package') as PackageSlug | null;
    if (
      pkgParam &&
      ['starter-launchpad', 'business-growth', 'custom-pro', 'help-me-choose'].includes(pkgParam)
    ) {
      initial.packageSlug = pkgParam;
    }

    const indParam = searchParams.get('industry');
    if (indParam && (INDUSTRIES as readonly string[]).includes(indParam)) {
      initial.industry = indParam;
    }

    setForm(initial);
    setHydrated(true);
  }, [searchParams]);

  // Auto-save to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // Ignore storage error
    }
  }, [form, hydrated]);

  const toggleMulti = (field: 'primaryGoals' | 'industrySpecifics' | 'leadAutomation' | 'assetsReady' | 'workflowTerms', value: string) => {
    setForm((prev) => {
      const list = prev[field];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [field]: next };
    });
  };

  const selectedPackageLabel = useMemo(() => {
    if (form.packageSlug === 'help-me-choose') return 'Help Me Choose';
    return WEBSITE_PACKAGES.find((p) => p.slug === form.packageSlug)?.name ?? 'Business Growth';
  }, [form.packageSlug]);

  const recommendedScope = useMemo(() => {
    if (
      form.contentSize === 'Large' ||
      form.industry === 'SaaS / Web App' ||
      form.primaryGoals.includes('Launch Custom App / MVP') ||
      form.primaryGoals.includes('Sell Products Online') ||
      form.updateMethod === 'Admin Panel'
    ) {
      return 'Custom Pro';
    }
    if (
      form.contentSize === 'Medium' ||
      form.primaryGoals.length >= 2 ||
      form.gbpSetup
    ) {
      return 'Business Growth';
    }
    return 'Starter Launchpad';
  }, [form.contentSize, form.industry, form.primaryGoals, form.updateMethod, form.gbpSetup]);

  const completionPct = useMemo(() => {
    let score = 20;
    if (form.clientName.trim().length >= 2) score += 20;
    if (isValidIndianMobile(form.phone)) score += 20;
    if (form.primaryGoals.length > 0) score += 10;
    if (form.industrySpecifics.length > 0 || form.leadAutomation.length > 0) score += 10;
    if (form.city.trim() || form.seoKeywords.trim() || form.assetsReady.length > 0) score += 10;
    if (form.goLiveWindow && form.budgetRange) score += 10;
    return Math.min(100, score);
  }, [form]);

  const activeIndustryOptions =
    INDUSTRY_SPECIFIC_OPTIONS[form.industry] ?? INDUSTRY_SPECIFIC_OPTIONS.default;

  const validateAllAndFocus = (): boolean => {
    const nextErrors: typeof errors = {};

    if (!form.clientName.trim() || form.clientName.trim().length < 2) {
      nextErrors.clientName = 'Please enter your name or business name.';
    } else if (!isEnglishOnly(form.clientName)) {
      nextErrors.clientName = 'Please use English characters only.';
    }

    if (!isValidIndianMobile(form.phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number starting with 6–9.';
    }

    if (form.email.trim() && !isValidEmail(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (form.additionalNotes.trim() && !isEnglishOnly(form.additionalNotes)) {
      nextErrors.additionalNotes = 'Please write additional notes in English characters only.';
    }

    setErrors(nextErrors);

    if (nextErrors.clientName || nextErrors.phone || nextErrors.email) {
      setStep(1);
      window.setTimeout(() => {
        if (nextErrors.clientName) nameInputRef.current?.focus();
        else if (nextErrors.phone) phoneInputRef.current?.focus();
        else if (nextErrors.email) emailInputRef.current?.focus();
      }, 60);
      showToast('Please complete your Name & 10-digit Indian Mobile in Step 1.', 'error');
      return false;
    }

    if (nextErrors.additionalNotes) {
      setStep(4);
      window.setTimeout(() => notesInputRef.current?.focus(), 60);
      showToast('Please use English characters only in Additional Notes.', 'error');
      return false;
    }

    return true;
  };

  const buildPayload = (submittedVia: string) => ({
    packageName: `${selectedPackageLabel} (Recommended: ${recommendedScope})`,
    industry: form.industry,
    clientName: form.clientName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    city: form.city.trim(),
    currentUrl: form.currentUrl.trim(),
    primaryGoals: form.primaryGoals.join(', '),
    contentSize: form.contentSize,
    industrySpecifics: form.industrySpecifics.join(', ') || 'Standard Industry Setup',
    leadAutomation: form.leadAutomation.join(', '),
    alertChannel: form.alertChannel,
    updateMethod: form.updateMethod,
    visualStyle: form.visualStyle,
    language: form.language,
    assetsReady: form.assetsReady.join(', ') || 'Need Guidance',
    seoKeywords: form.seoKeywords.trim(),
    gbpSetup: form.gbpSetup ? 'Yes' : 'No',
    references: form.references.trim(),
    goLiveWindow: form.goLiveWindow,
    budgetRange: form.budgetRange,
    workflowTerms: form.workflowTerms.join(' | '),
    additionalNotes: form.additionalNotes.trim(),
    submittedVia,
  });

  const formatPlainTextBrief = () => {
    const lines = [
      `WEBSITE ENQUIRY BRIEF — GAURAV VERMA`,
      `Package: ${selectedPackageLabel} (Smart Fit: ${recommendedScope})`,
      `Industry: ${form.industry}`,
      `Client / Business: ${form.clientName.trim()}`,
      `Mobile / WhatsApp: +91 ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : '',
      form.city.trim() ? `City / Area: ${form.city.trim()}` : '',
      form.currentUrl.trim() ? `Current URL / IG: ${form.currentUrl.trim()}` : '',
      `Goals: ${form.primaryGoals.join(', ') || 'N/A'}`,
      `Content Size: ${form.contentSize}`,
      `Industry Options: ${form.industrySpecifics.join(', ') || 'Standard'}`,
      `Lead Automation: ${form.leadAutomation.join(', ')} (Alerts: ${form.alertChannel})`,
      `Content Updates: ${form.updateMethod}`,
      `Visual Style: ${form.visualStyle} | Language: ${form.language}`,
      `Assets Ready: ${form.assetsReady.join(', ') || 'None yet'}`,
      form.seoKeywords.trim() ? `Target Localities / SEO: ${form.seoKeywords.trim()}` : '',
      `Google Business Profile: ${form.gbpSetup ? 'Yes' : 'No'}`,
      form.references.trim() ? `References: ${form.references.trim()}` : '',
      `Target Go-Live: ${form.goLiveWindow}`,
      `Comfort Budget: ${form.budgetRange}`,
      form.additionalNotes.trim() ? `Notes: ${form.additionalNotes.trim()}` : '',
    ];
    return lines.filter(Boolean).join('\n');
  };

  const syncToSheetWithGuard = async (submittedVia: string, force = false) => {
    const payload = buildPayload(submittedVia);
    const signature = JSON.stringify({ ...payload, submittedVia: '' });

    if (!force && signature === lastLoggedSignature && submittedLeadId) {
      return { ok: true, leadId: submittedLeadId, message: 'Already logged to Google Sheet.' };
    }

    setSubmitting(true);
    const res = await submitLead('enquiry', payload);
    setSubmitting(false);

    if (res.ok) {
      setLastLoggedSignature(signature);
      if (res.leadId) setSubmittedLeadId(res.leadId);
    }
    return res;
  };

  const handleSubmitDirect = async () => {
    if (!validateAllAndFocus()) return;
    const res = await syncToSheetWithGuard('Direct Form Submit', true);
    showToast(res.message, res.ok ? 'success' : 'error');
  };

  const handleSendWhatsApp = async () => {
    if (!validateAllAndFocus()) return;
    const brief = formatPlainTextBrief();
    const waHref = `https://wa.me/${DEVELOPER_PROFILE.whatsappNumber}?text=${encodeURIComponent(brief)}`;
    window.open(waHref, '_blank', 'noopener,noreferrer');
    const res = await syncToSheetWithGuard('WhatsApp Brief');
    if (res.ok) {
      showToast('Opened WhatsApp & logged your brief.', 'success');
    }
  };

  const handleCopyBrief = async () => {
    if (!validateAllAndFocus()) return;
    const ok = await copyToClipboard(formatPlainTextBrief());
    showToast(
      ok ? 'Copied formatted brief to clipboard.' : 'Could not copy brief automatically.',
      ok ? 'success' : 'error'
    );
    await syncToSheetWithGuard('Copy Brief');
  };

  const handleEmailBrief = async () => {
    if (!validateAllAndFocus()) return;
    const subject = `Website Enquiry — ${form.clientName.trim()} (${form.industry})`;
    const body = formatPlainTextBrief();
    window.location.href = `mailto:${DEVELOPER_PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    const res = await syncToSheetWithGuard('Email Brief');
    if (res.ok) {
      showToast('Opened email client & logged your brief.', 'success');
    }
  };

  const handleResetDraft = () => {
    setForm(DEFAULT_STATE);
    setErrors({});
    setSubmittedLeadId(null);
    setLastLoggedSignature('');
    setStep(1);
    try {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore
    }
    showToast('Enquiry draft reset to defaults.', 'default');
  };

  const mobileValid = form.phone.length > 0 && isValidIndianMobile(form.phone);
  const mobileInvalid = form.phone.length > 0 && !mobileValid;

  return (
    <div className="min-h-screen pb-28 lg:pb-16">
      {/* Sticky Top Header (z-40 below sidebar z-[70]) */}
      <header className="glass-header sticky top-0 z-40 px-5 py-3.5 sm:px-8 lg:pl-64 lg:pr-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              <Save className="h-3 w-3" />
              Draft Auto-Saved
            </span>
            <button
              type="button"
              onClick={handleResetDraft}
              className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Draft
            </button>
            <ThemeToggleButton compact />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl space-y-8 px-5 pt-10 sm:px-8 lg:pl-64 lg:pr-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Guided Website Enquiry
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Build your project brief in 4 quick steps.
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            No pricing guesswork or generic forms — tell me what you need and get a clear scope, timeline, and custom quote.
          </p>
        </div>

        {/* Jumpable 4-Step Pills */}
        <div className="flex flex-wrap gap-2">
          {STEPS.map((s) => {
            const isActive = step === s.num;
            const isPast = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setStep(s.num)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : isPast
                      ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                }`}
              >
                {isPast && <Check className="h-3.5 w-3.5" />}
                {s.title}
              </button>
            );
          })}
        </div>

        {/* Two-Column Wizard + Sticky Live Brief Summary */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {/* STEP 1: You & Business */}
            {step === 1 && (
              <div className="glass-card space-y-6 rounded-3xl p-6 sm:p-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Step 1: You & Business
                  </h2>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Select a starting package (zero prices shown) and share your contact details.
                  </p>
                </div>

                {/* Package Selector Cards */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Preferred Package
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {[
                      ...WEBSITE_PACKAGES.map((p) => ({
                        slug: p.slug as PackageSlug,
                        name: p.name,
                        badge: p.badge,
                      })),
                      {
                        slug: 'help-me-choose' as PackageSlug,
                        name: 'Help Me Choose',
                        badge: 'Guided',
                      },
                    ].map((opt) => {
                      const active = form.packageSlug === opt.slug;
                      return (
                        <button
                          key={opt.slug}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, packageSlug: opt.slug }))}
                          className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition ${
                            active
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--accent)]/60'
                          }`}
                        >
                          <span className="font-display text-sm font-bold text-[var(--text-primary)]">
                            {opt.name}
                          </span>
                          <span className="rounded-full bg-[var(--bg-solid)] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent)]">
                            {opt.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Industry Chips */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Industry Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((ind) => {
                      const active = form.industry === ind;
                      return (
                        <button
                          key={ind}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              industry: ind,
                              industrySpecifics: [],
                            }))
                          }
                          className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                            active
                              ? 'bg-[var(--accent)] text-white'
                              : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                          }`}
                        >
                          {ind}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                      Your Name / Business Name *
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={form.clientName}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, clientName: e.target.value }));
                        if (errors.clientName)
                          setErrors((prev) => ({ ...prev, clientName: undefined }));
                      }}
                      placeholder="e.g. Apex Realty / Karan Mehta"
                      className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                    />
                    {errors.clientName && (
                      <p className="mt-1 text-xs text-rose-500">{errors.clientName}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                      City / Area
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g. Gurugram, Delhi NCR"
                      className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                      Phone / WhatsApp (Indian 10-Digit) *
                    </label>
                    <div className="relative flex items-center">
                      <span className="pointer-events-none absolute left-3.5 font-mono text-xs font-semibold text-[var(--text-muted)]">
                        +91
                      </span>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={form.phone}
                        onChange={(e) => {
                          const clean = sanitizeMobileInput(e.target.value);
                          setForm((prev) => ({ ...prev, phone: clean }));
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="9876543210"
                        className={`field-input w-full rounded-xl py-2.5 pl-12 pr-3.5 font-mono text-sm ${
                          mobileValid
                            ? '!border-emerald-500'
                            : mobileInvalid
                              ? '!border-rose-500'
                              : ''
                        }`}
                      />
                    </div>
                    {mobileValid && (
                      <p className="mt-1 text-xs text-emerald-500">Valid 10-digit Indian mobile</p>
                    )}
                    {(errors.phone || mobileInvalid) && (
                      <p className="mt-1 text-xs text-rose-500">
                        {errors.phone || 'Must be 10 digits starting with 6–9.'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                      Email (Optional)
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@domain.com"
                      className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                    Current Website or Instagram URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.currentUrl}
                    onChange={(e) => setForm((prev) => ({ ...prev, currentUrl: e.target.value }))}
                    placeholder="https://instagram.com/yourbrand or https://yourwebsite.com"
                    className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Scope & Industry */}
            {step === 2 && (
              <div className="glass-card space-y-6 rounded-3xl p-6 sm:p-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Step 2: Scope & Industry Features
                  </h2>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Tailored dynamically for <strong className="text-[var(--accent)]">{form.industry}</strong>.
                  </p>
                </div>

                {/* Primary Goals */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Primary Goals (Multi-Select)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PRIMARY_GOALS.map((goal) => {
                      const active = form.primaryGoals.includes(goal);
                      return (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleMulti('primaryGoals', goal)}
                          className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                            active
                              ? 'bg-[var(--accent)] text-white'
                              : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {goal}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content Size */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Content Size
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {CONTENT_SIZES.map((size) => {
                      const active = form.contentSize === size;
                      const hint =
                        size === 'Compact'
                          ? '1 page / quick launch'
                          : size === 'Medium'
                            ? '3–5 pages'
                            : '6+ pages / web app';
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, contentSize: size }))}
                          className={`rounded-2xl border p-3 text-left transition ${
                            active
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)]'
                          }`}
                        >
                          <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                            {size}
                          </p>
                          <p className="text-[11px] text-[var(--text-muted)]">{hint}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Adaptive Industry-Specific Options Block */}
                <div className="space-y-2.5 rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] p-4">
                  <label className="block text-xs font-bold text-[var(--accent)]">
                    {form.industry} — Recommended Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeIndustryOptions.map((opt) => {
                      const active = form.industrySpecifics.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleMulti('industrySpecifics', opt)}
                          className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                            active
                              ? 'bg-[var(--accent)] text-white'
                              : 'border border-[var(--border-subtle)] bg-[var(--bg-solid)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lead & Automation Toggles */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Lead Capture & Automation
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LEAD_AUTOMATION_OPTIONS.map((item) => {
                      const active = form.leadAutomation.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleMulti('leadAutomation', item)}
                          className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                            active
                              ? 'bg-emerald-600 text-white'
                              : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Alert Channel & Update Method */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[var(--text-primary)]">
                      Instant Lead Alert Channel
                    </label>
                    <div className="flex gap-2">
                      {ALERT_CHANNELS.map((ch) => (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, alertChannel: ch }))}
                          className={`flex-1 rounded-xl py-2 text-xs font-semibold transition ${
                            form.alertChannel === ch
                              ? 'bg-[var(--accent)] text-white'
                              : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[var(--text-primary)]">
                      Content Update Method
                    </label>
                    <div className="flex gap-2">
                      {UPDATE_METHODS.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, updateMethod: m }))}
                          className={`flex-1 rounded-xl py-2 text-xs font-semibold transition ${
                            form.updateMethod === m
                              ? 'bg-[var(--accent)] text-white'
                              : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Design & SEO */}
            {step === 3 && (
              <div className="glass-card space-y-6 rounded-3xl p-6 sm:p-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Step 3: Design, Content & Local SEO
                  </h2>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Define the visual direction, language, assets, and search focus.
                  </p>
                </div>

                {/* Visual Style */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Visual Style
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {VISUAL_STYLES.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, visualStyle: style }))}
                        className={`rounded-2xl border p-3 text-left text-xs font-semibold transition ${
                          form.visualStyle === style
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Website Language
                  </label>
                  <div className="flex gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, language: lang }))}
                        className={`flex-1 rounded-xl py-2.5 text-xs font-semibold transition ${
                          form.language === lang
                            ? 'bg-[var(--accent)] text-white'
                            : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Assets Readiness */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Assets Already Ready
                  </label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ASSETS_OPTIONS.map((asset) => {
                      const checked = form.assetsReady.includes(asset);
                      return (
                        <button
                          key={asset}
                          type="button"
                          onClick={() => toggleMulti('assetsReady', asset)}
                          className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition ${
                            checked
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded border ${
                              checked
                                ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                                : 'border-[var(--text-muted)]'
                            }`}
                          >
                            {checked && <Check className="h-3 w-3" />}
                          </span>
                          {asset}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Localities / SEO Keywords */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                    Target Localities / SEO Keywords (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.seoKeywords}
                    onChange={(e) => setForm((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder="e.g. Luxury apartments Golf Course Road Gurugram"
                    className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  />
                </div>

                {/* Google Business Profile Checkbox */}
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, gbpSetup: !prev.gbpSetup }))}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left text-xs font-medium transition ${
                    form.gbpSetup
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-[var(--text-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                      form.gbpSetup
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-[var(--text-muted)]'
                    }`}
                  >
                    {form.gbpSetup && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <span>Include Google Business Profile alignment & local SEO checklist</span>
                </button>

                {/* Reference Websites */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                    Reference Websites You Like (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.references}
                    onChange={(e) => setForm((prev) => ({ ...prev, references: e.target.value }))}
                    placeholder="Share 1–2 links whose clean style you like"
                    className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Timeline & Launch */}
            {step === 4 && (
              <div className="glass-card space-y-6 rounded-3xl p-6 sm:p-8">
                <div>
                  <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Step 4: Timeline, Comfort Budget & Launch
                  </h2>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">
                    Review your launch window and submit directly or send via WhatsApp.
                  </p>
                </div>

                {/* Target Go-Live Window */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Target Go-Live Window
                  </label>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {GO_LIVE_WINDOWS.map((win) => (
                      <button
                        key={win}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, goLiveWindow: win }))}
                        className={`rounded-2xl border p-3 text-left text-xs font-semibold transition ${
                          form.goLiveWindow === win
                            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {win}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Comfort Budget Range */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Optional Comfort Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_RANGES.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, budgetRange: range }))}
                        className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                          form.budgetRange === range
                            ? 'bg-[var(--accent)] text-white'
                            : 'border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transparent Workflow Terms */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Transparent Workflow Terms
                  </label>
                  <div className="space-y-2">
                    {WORKFLOW_TERMS.map((term) => {
                      const active = form.workflowTerms.includes(term);
                      return (
                        <button
                          key={term}
                          type="button"
                          onClick={() => toggleMulti('workflowTerms', term)}
                          className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition ${
                            active
                              ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]'
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 items-center justify-center rounded border ${
                              active
                                ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                                : 'border-[var(--text-muted)]'
                            }`}
                          >
                            {active && <Check className="h-3 w-3" />}
                          </span>
                          {term}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                    Additional Notes (Optional · English Only)
                  </label>
                  <textarea
                    ref={notesInputRef}
                    rows={4}
                    value={form.additionalNotes}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, additionalNotes: e.target.value }));
                      if (errors.additionalNotes)
                        setErrors((prev) => ({ ...prev, additionalNotes: undefined }));
                    }}
                    placeholder="Any specific integrations, deadlines, or questions..."
                    className="field-input w-full resize-none rounded-xl px-3.5 py-2.5 text-sm"
                  />
                  {errors.additionalNotes && (
                    <p className="mt-1 text-xs text-rose-500">{errors.additionalNotes}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step Prev / Next Navigation Bar */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4)}
                className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Step
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4)}
                  className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-semibold"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitDirect}
                  disabled={submitting}
                  className="btn-primary inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-semibold disabled:opacity-60"
                >
                  Submit & Save Enquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sticky Right-Hand Live Brief Summary */}
          <div className="lg:col-span-4">
            <LiveBriefSummary
              completionPct={completionPct}
              recommendedScope={recommendedScope}
              selectedPackageLabel={selectedPackageLabel}
              industry={form.industry}
              clientName={form.clientName}
              phone={form.phone}
              city={form.city}
              contentSize={form.contentSize}
              goalsCount={form.primaryGoals.length}
              goLiveWindow={form.goLiveWindow}
              budgetRange={form.budgetRange}
              submitting={submitting}
              submittedLeadId={submittedLeadId}
              onSubmitDirect={handleSubmitDirect}
              onSendWhatsApp={handleSendWhatsApp}
              onCopyBrief={handleCopyBrief}
              onEmailBrief={handleEmailBrief}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
