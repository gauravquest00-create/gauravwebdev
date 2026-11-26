import type { Metadata } from 'next';
import React from 'react';
import { ProjectsDirectory } from '@/components/projects/ProjectsDirectory';
import { SiteFooter } from '@/components/layout/SiteFooter';

export const metadata: Metadata = {
  title: 'All 12 Shipped Projects',
  description:
    'Explore all 12 production websites, SaaS platforms, AI brokerage tools, and D2C storefronts built by Gaurav Verma.',
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsDirectory />
      <SiteFooter />
    </>
  );
}
