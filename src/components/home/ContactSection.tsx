'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { DepthZoomSection } from '@/components/effects/DepthZoomSection';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { useToast } from '@/context/ToastContext';
import { copyToClipboard } from '@/lib/clipboard';
import { submitLead } from '@/lib/sheetConfig';
import {
  isEnglishOnly,
  isValidEmail,
  isValidIndianMobile,
  sanitizeMobileInput,
} from '@/lib/validation';

export function ContactSection() {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    fullName?: string;
    mobile?: string;
    email?: string;
    projectBrief?: string;
  }>({});

  const mobileValid = mobile.length > 0 && isValidIndianMobile(mobile);
  const mobileInvalid = mobile.length > 0 && !mobileValid;

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(DEVELOPER_PROFILE.email);
    showToast(
      ok ? `Copied ${DEVELOPER_PROFILE.email}` : 'Unable to copy email.',
      ok ? 'success' : 'error'
    );
  };

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your name.';
    } else if (!isEnglishOnly(fullName)) {
      nextErrors.fullName = 'Please use English characters only.';
    }

    if (!isValidIndianMobile(mobile)) {
      nextErrors.mobile = 'Enter a valid 10-digit Indian mobile number starting with 6–9.';
    }

    if (email.trim() && !isValidEmail(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!projectBrief.trim() || projectBrief.trim().length < 10) {
      nextErrors.projectBrief = 'Please share a short brief (at least 10 characters).';
    } else if (!isEnglishOnly(projectBrief)) {
      nextErrors.projectBrief = 'Please write your project brief in English characters only.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the highlighted fields before sending.', 'error');
      return;
    }

    setSubmitting(true);
    const result = await submitLead('contact', {
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      projectBrief: projectBrief.trim(),
      source: 'Home Quick Contact Form',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '/',
    });
    setSubmitting(false);

    if (result.ok) {
      setSubmittedLeadId(result.leadId ?? 'SAVED');
      setFullName('');
      setMobile('');
      setEmail('');
      setProjectBrief('');
      setErrors({});
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  return (
    <DepthZoomSection id="contact">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Direct Contact Cards */}
        <div data-reveal="left" className="reveal space-y-6 lg:col-span-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              06 // Contact
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              Let&apos;s talk about your next build.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              Prefer a quick message? Reach out directly via WhatsApp, phone, or the validated quick contact form.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={DEVELOPER_PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4 rounded-2xl p-4 hover:border-emerald-500"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">WhatsApp (Fastest)</p>
                <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                  {DEVELOPER_PROFILE.whatsappDisplay}
                </p>
              </div>
            </a>

            <a
              href={DEVELOPER_PROFILE.phoneHref}
              className="glass-card flex items-center gap-4 rounded-2xl p-4 hover:border-[var(--accent)]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">Direct Call</p>
                <p className="font-display text-sm font-bold text-[var(--text-primary)]">
                  {DEVELOPER_PROFILE.phoneDisplay}
                </p>
              </div>
            </a>

            <div className="glass-card flex items-center justify-between gap-3 rounded-2xl p-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--text-muted)]">Email</p>
                  <p className="truncate font-display text-sm font-bold text-[var(--text-primary)]">
                    {DEVELOPER_PROFILE.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email"
                className="btn-secondary shrink-0 rounded-xl p-2"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 px-1 text-xs text-[var(--text-muted)]">
              <MapPin className="h-4 w-4 text-[var(--accent)]" />
              <span>
                {DEVELOPER_PROFILE.location} · {DEVELOPER_PROFILE.responseTime}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Validated Quick Contact Form */}
        <div data-reveal="right" className="reveal lg:col-span-7">
          <form onSubmit={handleSubmit} noValidate className="glass-card space-y-5 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Quick Contact Form
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Synced securely to Google Sheets · English characters & 10-digit Indian mobile
                </p>
              </div>
            </div>

            {submittedLeadId && (
              <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">Message received! Reference ID: {submittedLeadId}</p>
                  <p className="mt-0.5 text-xs opacity-90">
                    Gaurav will reach out shortly via call or WhatsApp.
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="e.g. Rohan Sharma"
                  className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                  Indian Mobile / WhatsApp *
                </label>
                <div className="relative flex items-center">
                  <span className="pointer-events-none absolute left-3.5 font-mono text-xs font-semibold text-[var(--text-muted)]">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => {
                      const clean = sanitizeMobileInput(e.target.value);
                      setMobile(clean);
                      if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: undefined }));
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
                {(errors.mobile || mobileInvalid) && (
                  <p className="mt-1 text-xs text-rose-500">
                    {errors.mobile || 'Must be 10 digits starting with 6, 7, 8, or 9.'}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@company.com"
                className="field-input w-full rounded-xl px-3.5 py-2.5 text-sm"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                Project Brief *
              </label>
              <textarea
                rows={4}
                value={projectBrief}
                onChange={(e) => {
                  setProjectBrief(e.target.value);
                  if (errors.projectBrief)
                    setErrors((prev) => ({ ...prev, projectBrief: undefined }));
                }}
                placeholder="Tell me about your business, website goal, and expected timeline..."
                className="field-input w-full resize-none rounded-xl px-3.5 py-2.5 text-sm"
              />
              {errors.projectBrief && (
                <p className="mt-1 text-xs text-rose-500">{errors.projectBrief}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </DepthZoomSection>
  );
}
