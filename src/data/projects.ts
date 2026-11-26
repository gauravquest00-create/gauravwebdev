export type ProjectCategory = 'Real Estate' | 'SaaS & AI' | 'Business & E-com';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectItem {
  slug: string;
  number: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  overview: string;
  features: string[];
  tech: string[];
  categories: ProjectCategory[];
  live: string;
  github?: string;
  featured: boolean;
  accentColor: string;
  stats: [ProjectStat, ProjectStat, ProjectStat];
  highlights: string[];
}

export const PROJECT_CATEGORIES: ('All' | 'Featured' | ProjectCategory)[] = [
  'All',
  'Featured',
  'Real Estate',
  'SaaS & AI',
  'Business & E-com',
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'buyin',
    number: '01',
    name: 'BUYIN',
    type: 'Verified Real Estate Buyer Requirement Network',
    tagline: 'Claim Verified Buyer Requirements. Own Every Lead Exclusively.',
    description:
      'An exclusive buyer-requirement marketplace where verified brokers claim high-intent property requirements instead of competing over recycled portal leads.',
    overview:
      'BUYIN flips traditional real estate lead generation on its head by putting verified buyer requirements at the center. Brokers browse vetted demand cards, claim leads exclusively with structured wallet/credit logic, and close deals without multi-broker spam.',
    features: [
      'Exclusive buyer requirement claiming with anti-duplication locks',
      'Structured property requirement cards (budget, locality, BHK, urgency)',
      'Broker verification flow and lead ownership lifecycle tracking',
      'High-speed responsive UI tailored for on-field real estate brokers',
      'Instant WhatsApp & callback handoff after lead unlock',
    ],
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    categories: ['Real Estate', 'SaaS & AI'],
    live: 'https://buyinnetwork.vercel.app/',
    featured: true,
    accentColor: '#4F46E5',
    stats: [
      { label: 'Lead Model', value: '100% Exclusive' },
      { label: 'Focus', value: 'Verified Demand' },
      { label: 'Deployment', value: 'Live Production' },
    ],
    highlights: [
      'Designed a buyer-first architecture eliminating shared lead fatigue for brokers.',
      'Engineered fast filterable requirement feeds with clear urgency and locality signals.',
      'Built mobile-first workflows so brokers can inspect and claim requirements on the go.',
    ],
  },
  {
    slug: 'dealnexis',
    number: '02',
    name: 'DealNexis CRM',
    type: 'SaaS Platform',
    tagline: 'Streamlined pipeline, follow-ups, and deal visibility in one clean CRM.',
    description:
      'A focused SaaS CRM workspace built to help sales teams capture leads, manage follow-up cadences, and track deal stages without enterprise bloat.',
    overview:
      'DealNexis CRM streamlines daily sales operations into a fast, clutter-free interface. Teams track incoming leads, organize pipeline stages, monitor conversion health, and stay on top of scheduled callbacks from a unified dashboard.',
    features: [
      'Visual pipeline stage management with instant status transitions',
      'Lead capture, source tagging, and activity timeline tracking',
      'Follow-up reminders and priority queue for high-intent prospects',
      'Clean analytics summary cards for conversion and pipeline velocity',
      'Responsive workspace accessible across desktop and mobile browsers',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    categories: ['SaaS & AI'],
    live: 'https://dealnexis.vercel.app/',
    featured: true,
    accentColor: '#6366F1',
    stats: [
      { label: 'Category', value: 'B2B SaaS' },
      { label: 'Core Flow', value: 'Pipeline CRM' },
      { label: 'Interface', value: 'Zero-Bloat UI' },
    ],
    highlights: [
      'Structured modular state management for instant stage updates and filtering.',
      'Crafted an intuitive dashboard hierarchy prioritizing daily follow-up actions.',
      'Optimized bundle performance for snappy transitions between CRM views.',
    ],
  },
  {
    slug: 'reva-assiste',
    number: '03',
    name: 'REVA ASSISTE',
    type: 'AI-Powered Real Estate Sales Intelligence & Brokerage OS',
    tagline: 'AI sales intelligence and brokerage operating system for modern property teams.',
    description:
      'An AI-assisted real estate brokerage OS combining lead intelligence, property matching, and sales workflow automation in one platform.',
    overview:
      'REVA ASSISTE equips real estate brokerages with an intelligent operating system. It combines structured inventory management, buyer intent analysis, and AI-guided sales workflows so advisors respond faster and close with stronger context.',
    features: [
      'AI-powered sales intelligence and buyer readiness scoring',
      'Unified brokerage workspace for inventory, leads, and advisor tasks',
      'Smart property-to-buyer recommendation views',
      'Clean executive overview with pipeline and response metrics',
      'Open-source repository with modular component architecture',
    ],
    tech: ['React', 'AI Workflows', 'Node.js', 'REST API', 'Modern CSS'],
    categories: ['Real Estate', 'SaaS & AI'],
    live: 'https://reva-assiste.vercel.app/',
    github: 'https://github.com/gauravquest00-create/revaAssiste',
    featured: true,
    accentColor: '#7C3AED',
    stats: [
      { label: 'Domain', value: 'Brokerage OS' },
      { label: 'Intelligence', value: 'AI-Assisted' },
      { label: 'Codebase', value: 'Open GitHub' },
    ],
    highlights: [
      'Unified brokerage operations and AI-assisted lead qualification into one cohesive UX.',
      'Built reusable UI modules supporting rapid feature expansion across teams.',
      'Delivered a fast, responsive web experience deployable directly on Vercel.',
    ],
  },
  {
    slug: 'dealdesk',
    number: '04',
    name: 'Deal Desk',
    type: 'Real Estate Deal Workspace (QR → Deal, 7-Factor AI Matching)',
    tagline: 'Turn walk-in QR scans into structured deals with 7-factor AI property matching.',
    description:
      'A real estate deal workspace featuring instant QR-to-Deal intake and a 7-factor AI matching engine connecting buyers to the right inventory.',
    overview:
      'Deal Desk bridges offline property visits and digital deal closing. Visitors scan a QR code at a site or office to submit structured preferences, which immediately feed into a 7-factor matching engine that surfaces best-fit units for advisors.',
    features: [
      'QR → Deal instant buyer intake workflow for site visits and offices',
      '7-factor AI matching engine across budget, location, size, and preferences',
      'Side-by-side deal comparison and shortlist workspace',
      'Structured buyer brief capture with zero manual data re-entry',
      'Fast mobile experience tailored for live client presentations',
    ],
    tech: ['React', 'AI Matching', 'QR Workflows', 'Node.js', 'Tailwind CSS'],
    categories: ['Real Estate', 'SaaS & AI'],
    live: 'https://dealdeskworkspace.vercel.app/',
    featured: true,
    accentColor: '#0F766E',
    stats: [
      { label: 'Intake', value: 'QR → Deal' },
      { label: 'Engine', value: '7-Factor Match' },
      { label: 'Use Case', value: 'Site & Desk' },
    ],
    highlights: [
      'Designed the QR → Deal intake experience to capture clean buyer intent in under 30 seconds.',
      'Implemented multi-factor scoring logic to rank matching properties transparently.',
      'Built an advisor-friendly workspace optimized for tablets and smartphones.',
    ],
  },
  {
    slug: 'buildforgestudio',
    number: '05',
    name: 'BuildForge Studio',
    type: 'Development Studio & CMS',
    tagline: 'Modern development studio showcase paired with clean content management workflows.',
    description:
      'A studio web platform and CMS architecture showcasing engineering capabilities, structured case studies, and client project onboarding.',
    overview:
      'BuildForge Studio pairs a crisp agency presentation layer with structured content management. It demonstrates clean typography, fast navigation, and organized service storytelling built to convert technical and founder-led inquiries.',
    features: [
      'Editorial studio landing architecture with clear service positioning',
      'Structured CMS-ready portfolio and case study management',
      'Fast responsive layouts with refined micro-interactions',
      'Direct project inquiry pipeline for founders and agencies',
      'Public GitHub repository with clean modular structure',
    ],
    tech: ['React', 'CMS Architecture', 'JavaScript', 'CSS3', 'Vercel'],
    categories: ['SaaS & AI', 'Business & E-com'],
    live: 'https://buildforgestudio.vercel.app/',
    github: 'https://github.com/gauravquest00-create/buildforgestudio',
    featured: true,
    accentColor: '#F97316',
    stats: [
      { label: 'Focus', value: 'Studio + CMS' },
      { label: 'Performance', value: 'Fast Edge' },
      { label: 'Codebase', value: 'Open GitHub' },
    ],
    highlights: [
      'Crafted a bold studio brand identity with crisp visual hierarchy.',
      'Architected reusable content sections for effortless portfolio updates.',
      'Published clean source code demonstrating maintainable frontend patterns.',
    ],
  },
  {
    slug: 'propintel',
    number: '06',
    name: 'PropIntel',
    type: 'Property & Lead Intelligence Workspace',
    tagline: 'Actionable property analytics and lead intelligence in a single workspace.',
    description:
      'A property and lead intelligence workspace designed to organize listings, analyze buyer signals, and accelerate brokerage decision-making.',
    overview:
      'PropIntel brings clarity to real estate inventory and lead data. Instead of juggling scattered spreadsheets and chat threads, property teams track listings, buyer intent, and market positioning inside a fast analytical workspace.',
    features: [
      'Centralized property inventory with quick search and structured filters',
      'Lead intelligence view highlighting priority inquiries and readiness',
      'Clean visual data cards for comparing project attributes',
      'Mobile-ready interface for brokers working across Gurugram and NCR',
      'Instant handoff actions for calls and WhatsApp follow-ups',
    ],
    tech: ['React', 'JavaScript', 'Data Modeling', 'Responsive UI', 'Vercel'],
    categories: ['Real Estate', 'SaaS & AI'],
    live: 'https://propintel-ge.vercel.app/',
    featured: true,
    accentColor: '#8B5CF6',
    stats: [
      { label: 'Focus', value: 'PropTech Intel' },
      { label: 'Workflow', value: 'Lead + Listing' },
      { label: 'Status', value: 'Live App' },
    ],
    highlights: [
      'Consolidated fragmented listing and lead workflows into one scannable dashboard.',
      'Engineered fast client-side filtering for immediate property comparisons.',
      'Designed clear visual badges so teams spot high-priority opportunities instantly.',
    ],
  },
  {
    slug: 'naturalnestorganic',
    number: '07',
    name: 'NaturalNestOrganic',
    type: 'Honey Brand & Mini E-commerce',
    tagline: 'Pure organic honey storefront with warm storytelling and frictionless ordering.',
    description:
      'A D2C organic honey brand website and mini e-commerce storefront designed for trust, product education, and quick mobile purchases.',
    overview:
      'NaturalNestOrganic brings a natural, trustworthy digital home to a growing D2C honey brand. The storefront balances warm editorial storytelling about purity and sourcing with a fast, conversion-focused catalog and order experience.',
    features: [
      'Brand-first D2C homepage highlighting purity, sourcing, and benefits',
      'Product catalog with pack variants, clear imagery, and quick order flow',
      'Mobile-optimized browsing tailored for social media traffic',
      'Trust badges, customer reviews, and direct WhatsApp order assistance',
      'Custom domain production deployment with SEO fundamentals',
    ],
    tech: ['React', 'D2C Storefront', 'Local SEO', 'WhatsApp Order', 'Responsive CSS'],
    categories: ['Business & E-com'],
    live: 'https://naturalnestorganic.com/',
    featured: true,
    accentColor: '#EC4899',
    stats: [
      { label: 'Sector', value: 'D2C Organic' },
      { label: 'Domain', value: 'Custom .com' },
      { label: 'Experience', value: 'Mini E-com' },
    ],
    highlights: [
      'Paired warm organic visual design with fast-loading product cards.',
      'Built a frictionless mobile order path tailored for Indian D2C shoppers.',
      'Deployed on a custom domain with clean on-page SEO structure.',
    ],
  },
  {
    slug: 'luxurynest',
    number: '08',
    name: 'LuxuryNest',
    type: 'Real Estate Website (Serverless Apps Script + Sheets)',
    tagline: 'Luxury property showcase powered by serverless Google Apps Script lead capture.',
    description:
      'A high-end real estate showcase with curated residences and a zero-server-cost Google Apps Script + Google Sheets lead pipeline.',
    overview:
      'LuxuryNest combines refined editorial presentation for premium properties with an ultra-reliable serverless backend. Every buyer inquiry is validated on the frontend and written straight into Google Sheets via Apps Script with zero hosting overhead.',
    features: [
      'Editorial luxury property showcase with clean visual hierarchy',
      'Serverless Google Apps Script + Google Sheets automated lead logging',
      'Validated buyer enquiry forms with instant WhatsApp escalation',
      'Fast responsive layout across mobile and desktop viewports',
      'Zero monthly backend server cost for the real estate team',
    ],
    tech: ['React', 'Google Apps Script', 'Google Sheets', 'Local SEO', 'Vercel'],
    categories: ['Real Estate'],
    live: 'https://luxurynest.vercel.app/',
    featured: false,
    accentColor: '#3B82F6',
    stats: [
      { label: 'Backend', value: 'Apps Script' },
      { label: 'Lead Sync', value: 'Google Sheets' },
      { label: 'Segment', value: 'Luxury Homes' },
    ],
    highlights: [
      'Engineered a zero-maintenance serverless lead pipeline directly into Google Sheets.',
      'Designed an editorial aesthetic suited to high-ticket residential buyers.',
      'Optimized asset loading for crisp performance on mobile networks.',
    ],
  },
  {
    slug: 'globalhomes',
    number: '09',
    name: 'Global Homes',
    type: 'Premium Real Estate Website',
    tagline: 'Premium residential discovery and structured buyer inquiry experience.',
    description:
      'A polished real estate website presenting curated residential projects, neighborhood context, and direct advisor contact.',
    overview:
      'Global Homes was built to give a real estate advisory firm a credible, modern digital storefront. Prospective buyers explore featured developments, inspect key highlights, and connect directly with advisors via validated forms or WhatsApp.',
    features: [
      'Curated project showcase with clean property metadata cards',
      'Direct advisor call and WhatsApp conversion touchpoints',
      'Mobile-first layout designed for paid ads and organic traffic',
      'SEO-friendly headings and structured section hierarchy',
      'Open-source repository available on GitHub',
    ],
    tech: ['React', 'JavaScript', 'Responsive UI', 'WhatsApp CTA', 'Vercel'],
    categories: ['Real Estate'],
    live: 'https://globalhomesestate.vercel.app/',
    github: 'https://github.com/gauravquest00-create/globalhomes',
    featured: false,
    accentColor: '#14B8A6',
    stats: [
      { label: 'Sector', value: 'Real Estate' },
      { label: 'Conversion', value: 'Direct Lead' },
      { label: 'Codebase', value: 'Open GitHub' },
    ],
    highlights: [
      'Delivered a trustworthy digital presence tailored to homebuyers and investors.',
      'Streamlined navigation so buyers reach project details and contact in two taps.',
      'Maintained clean, readable code published publicly on GitHub.',
    ],
  },
  {
    slug: 'webcraft',
    number: '10',
    name: 'WebCraft',
    type: 'Agency Platform',
    tagline: 'Clean digital agency website built to showcase work and capture retainers.',
    description:
      'A sleek agency platform presenting web design services, structured process milestones, and high-trust client inquiry flows.',
    overview:
      'WebCraft gives a digital agency a crisp, persuasive web presence. It pairs clear service positioning with scannable process steps and conversion-focused CTAs that turn visitors into qualified discovery calls.',
    features: [
      'Structured agency hero, service matrix, and process timeline',
      'Responsive portfolio showcase with clean card geometry',
      'Fast page loads and smooth scroll transitions',
      'Conversion-oriented inquiry CTA placement across sections',
      'Modern minimalist typography and balanced spacing',
    ],
    tech: ['React', 'Modern UI', 'JavaScript', 'CSS3', 'Vercel'],
    categories: ['Business & E-com'],
    live: 'https://webcraft-woad.vercel.app/',
    featured: false,
    accentColor: '#10B981',
    stats: [
      { label: 'Category', value: 'Agency Site' },
      { label: 'Style', value: 'Minimal Clean' },
      { label: 'Status', value: 'Live Site' },
    ],
    highlights: [
      'Designed clear service packaging that helps prospective clients self-qualify.',
      'Applied consistent spacing and typographic rhythm across every breakpoint.',
      'Built lightweight components for rapid loading on all devices.',
    ],
  },
  {
    slug: 'ironparadise',
    number: '11',
    name: 'IronParadise',
    type: 'Gym Management System',
    tagline: 'High-energy fitness brand presence and streamlined gym member workflows.',
    description:
      'A bold fitness and gym management web platform showcasing training programs, membership paths, and quick walk-in trial booking.',
    overview:
      'IronParadise pairs an energetic fitness brand identity with practical gym management flows. Prospective members explore training programs, facility highlights, and membership options while submitting trial or enrollment requests effortlessly.',
    features: [
      'High-impact fitness landing experience with program highlights',
      'Structured membership and trial inquiry workflows',
      'Mobile-ready schedule and trainer information blocks',
      'Direct click-to-call and WhatsApp inquiry integration',
      'Fast-loading dark/high-contrast athletic visual system',
    ],
    tech: ['React', 'Gym Workflows', 'JavaScript', 'Responsive UI', 'Vercel'],
    categories: ['Business & E-com'],
    live: 'https://ironparadisgyms.vercel.app/',
    featured: false,
    accentColor: '#F59E0B',
    stats: [
      { label: 'Industry', value: 'Fitness & Gym' },
      { label: 'Workflow', value: 'Trials & Plans' },
      { label: 'Status', value: 'Live App' },
    ],
    highlights: [
      'Created an energetic visual design tailored to local gym and fitness audiences.',
      'Simplified trial booking and membership inquiries to boost walk-in conversions.',
      'Ensured smooth mobile responsiveness for Instagram and Google Maps visitors.',
    ],
  },
  {
    slug: 'gauravassociates',
    number: '12',
    name: 'GauravAssociates',
    type: 'Business Demo Site',
    tagline: 'Clean corporate business website template engineered for instant trust.',
    description:
      'A sharp business advisory demo website demonstrating clean layout structure, service clarity, and direct client lead capture.',
    overview:
      'GauravAssociates serves as a focused corporate business showcase. It demonstrates how local service firms, consultants, and advisory practices can establish immediate online authority with crisp typography and frictionless contact paths.',
    features: [
      'Executive service overview with scannable value propositions',
      'Clean contact and consultation request flow',
      'Mobile-first responsiveness across phones, tablets, and desktops',
      'Fast static delivery with crisp typography and spacing',
      'Adaptable structure ready for consulting and local firms',
    ],
    tech: ['React', 'Business UI', 'JavaScript', 'CSS3', 'Vercel'],
    categories: ['Business & E-com'],
    live: 'https://gauravassociates.vercel.app/',
    featured: false,
    accentColor: '#06B6D4',
    stats: [
      { label: 'Category', value: 'Corporate Demo' },
      { label: 'Focus', value: 'Trust & Leads' },
      { label: 'Status', value: 'Live Site' },
    ],
    highlights: [
      'Structured content blocks so business owners immediately see how their brand fits.',
      'Focused on clarity, speed, and zero visual clutter across sections.',
      'Built a clean foundation easily customizable for any advisory or service business.',
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
