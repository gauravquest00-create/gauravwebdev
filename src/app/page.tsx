import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { GetWebsiteSection } from '@/components/home/GetWebsiteSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ContactSection } from '@/components/home/ContactSection';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <GetWebsiteSection />
      <TestimonialsSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}
