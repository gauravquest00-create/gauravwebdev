export type PackageSlug =
  | 'starter-launchpad'
  | 'business-growth'
  | 'custom-pro'
  | 'help-me-choose';

export interface WebsitePackage {
  slug: Exclude<PackageSlug, 'help-me-choose'>;
  name: string;
  badge: string;
  recommended?: boolean;
  subtitle: string;
  idealFor: string;
  features: string[];
}

export interface IndustryQuickOption {
  id: string;
  label: string;
  enquiryValue: string;
  contextNote: string;
}

export const INDUSTRY_QUICK_SELECT: IndustryQuickOption[] = [
  {
    id: 'all-businesses',
    label: 'All Businesses',
    enquiryValue: 'Other',
    contextNote:
      'Every package adapts cleanly to your business model — zero hidden templates, built mobile-first with structured lead capture.',
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    enquiryValue: 'Real Estate',
    contextNote:
      'Ideal for brokers, channel partners, and developers — supports RERA details, BHK filters, downloadable brochures, and Google Sheet lead sync.',
  },
  {
    id: 'd2c-ecommerce',
    label: 'D2C / E-commerce',
    enquiryValue: 'E-commerce / D2C',
    contextNote:
      'Showcase product variants, stories, trust badges, and direct WhatsApp or cart checkout built for fast mobile buyers.',
  },
  {
    id: 'clinics-wellness',
    label: 'Clinics & Wellness',
    enquiryValue: 'Clinic / Gym / Local Business',
    contextNote:
      'Highlight treatments, doctor profiles, Google Maps directions, and effortless appointment booking or WhatsApp inquiries.',
  },
  {
    id: 'gyms-studios',
    label: 'Gyms & Studios',
    enquiryValue: 'Clinic / Gym / Local Business',
    contextNote:
      'Drive walk-in trial bookings, display membership tiers, class schedules, and direct location links for local discovery.',
  },
  {
    id: 'agencies-consultants',
    label: 'Agencies & Consultants',
    enquiryValue: 'Service / Agency',
    contextNote:
      'Position your services with editorial case studies, clear process breakdowns, and qualified discovery-call intake forms.',
  },
  {
    id: 'cafes-hospitality',
    label: 'Cafes & Hospitality',
    enquiryValue: 'Clinic / Gym / Local Business',
    contextNote:
      'Fast digital menus, table or stay inquiries, gallery storytelling, and local Google Business Profile visibility.',
  },
  {
    id: 'startups-saas',
    label: 'Startups & SaaS',
    enquiryValue: 'SaaS / Web App',
    contextNote:
      'Launch sharp marketing sites, interactive product demos, or full-stack MVP dashboards built on Next.js and MERN.',
  },
];

// Strictly ZERO prices displayed across all packages
export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    slug: 'starter-launchpad',
    name: 'Starter Launchpad',
    badge: 'Quick Launch',
    subtitle: 'A crisp, fast single-page website to establish credibility and start capturing leads immediately.',
    idealFor: 'Solo founders, local businesses, consultants, and fast campaigns',
    features: [
      'Clean 1-page responsive website (up to 10 items / offerings)',
      'Validated enquiry form + instant WhatsApp click-to-chat button',
      'Embedded Google Maps location & direct call actions',
      'Mobile-first performance and fast page load optimization',
      'Essential on-page SEO titles, meta tags, and clean headings',
    ],
  },
  {
    slug: 'business-growth',
    name: 'Business Growth',
    badge: 'Recommended',
    recommended: true,
    subtitle: 'A multi-page conversion engine with automated Google Sheets lead sync and local SEO visibility.',
    idealFor: 'Growing brands, real estate teams, clinics, gyms, and agencies',
    features: [
      'Up to 5 custom-designed pages tailored to your brand',
      'Smart lead capture synced to Google Sheets + instant alerts',
      'Google Business Profile alignment & local SEO structure',
      'Easy content updates via Google Sheets or lightweight CMS',
      'Trust signals, testimonials, and Core Web Vitals speed tuning',
    ],
  },
  {
    slug: 'custom-pro',
    name: 'Custom Pro',
    badge: 'Full Scale',
    subtitle: 'Bespoke web applications, microsites, mini e-commerce, or automated CRM-connected systems.',
    idealFor: 'D2C stores, real estate portals, startups, and custom SaaS MVPs',
    features: [
      'Custom web app, multi-project microsite, or mini e-commerce store',
      'Downloadable brochures, interactive filters, or booking flows',
      'Automated CRM, Google Sheets & WhatsApp lead pipeline',
      'Custom admin dashboard with role-ready data management',
      '3 months priority post-launch support & iteration assistance',
    ],
  },
];
