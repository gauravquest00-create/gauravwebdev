import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { GuidedEnquiryWizard } from '@/components/enquiry/GuidedEnquiryWizard';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'Website Enquiry — 4-Step Project Brief',
  description:
    'Configure your website scope, industry features, design direction, and launch timeline in 4 guided steps.',
};

export default function EnquiryPage() {
  return (
    <>
      <Suspense fallback={<div className="min-h-screen" />}>
        <GuidedEnquiryWizard />
      </Suspense>
      <SiteFooter />
    </>
  );
}
