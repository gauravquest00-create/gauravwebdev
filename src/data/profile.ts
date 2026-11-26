export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  deliverableHighlight: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  accent: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export const DEVELOPER_PROFILE = {
  name: 'Gaurav Verma',
  brandTitle: 'Gaurav — Website Developer',
  initials: 'GV',
 headline: "Hi, I'm Gaurav — I build fast, modern websites that bring real leads.",
  subheadline:
    "I'm a Website & Full-Stack Developer helping real estate teams, D2C brands, clinics, gyms, and founders turn ideas into clean, high-converting websites, SaaS MVPs, and automated lead systems.",
  role: 'React & AI-Assisted MERN Stack Developer',
  location: 'Gurugram, Haryana, India (IST)',
  availability: 'Available for new websites & custom builds',
  responseTime: 'Typically replies within 2–4 hours (IST)',
  phoneDisplay: '+91 87502 88716',
  phoneHref: 'tel:+918750288716',
  whatsappDisplay: '+91 81308 39987',
  whatsappNumber: '918130839987',
  whatsappUrl: 'https://wa.me/918130839987',
  email: 'gauravquest00@gmail.com',
  githubUrl: 'https://github.com/gauravquest00-create',
  linkedinUrl: 'https://linkedin.com/in/gaurav-verma-10b287248',
  portfolioHubUrl: 'https://gauravbuildss.vercel.app',
  shortBio:
    'Full-stack React & MERN developer based in Gurugram building fast, mobile-first websites, real estate platforms, and Google Sheets / WhatsApp lead systems.',
  stackSummary: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Three.js', 'Apps Script'],
} as const;

export const HERO_STATS: HeroStat[] = [
  { value: '12+', label: 'Shipped Live Projects' },
  { value: '100%', label: 'Mobile-First Speed' },
  { value: '7–14d', label: 'Typical Launch Cycle' },
  { value: 'IST', label: 'Gurugram · Direct Support' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'high-converting-websites',
    number: '01',
    title: 'High-Converting Websites',
    description:
      'Clean, fast, mobile-first business websites engineered for trust, local search visibility, and frictionless WhatsApp or Google Sheets lead capture.',
    tags: ['React & Vite', 'Local SEO', 'Google Sheets'],
    deliverableHighlight: 'Built for instant credibility and higher enquiry conversion.',
  },
  {
    id: 'saas-mvps-web-apps',
    number: '02',
    title: 'SaaS MVPs & Custom Web Apps',
    description:
      'Production-ready web applications, real estate CRMs, buyer networks, and custom admin dashboards structured cleanly from database to UI.',
    tags: ['Node & Express', 'MongoDB', 'REST APIs'],
    deliverableHighlight: 'Scalable architecture designed to ship fast and grow cleanly.',
  },
  {
    id: 'ai-lead-automation',
    number: '03',
    title: 'AI & Lead Automation',
    description:
      'Automated lead pipelines connecting website forms to Google Sheets, instant WhatsApp workflows, AI-assisted matching, and lightweight PWA tools.',
    tags: ['AI Integration', 'Apps Script', 'PWA'],
    deliverableHighlight: 'Zero missed enquiries with structured lead tracking.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'vikram-malhotra',
    name: 'Vikram Malhotra',
    role: 'Global Homes · Real Estate',
    quote:
      'Gaurav delivered a sharp, fast property website that immediately elevated how buyers perceive our listings. Every enquiry lands cleanly with zero friction.',
    initials: 'VM',
    accent: '#14B8A6',
  },
  {
    id: 'ananya-deshmukh',
    name: 'Ananya Deshmukh',
    role: 'NaturalNestOrganic · D2C Brand',
    quote:
      'From product storytelling to quick mobile ordering, the storefront feels warm, trustworthy, and effortless for customers across India.',
    initials: 'AD',
    accent: '#EC4899',
  },
  {
    id: 'rohit-sehgal',
    name: 'Rohit Sehgal',
    role: 'IronParadise · Fitness & Gym',
    quote:
      'Clean UI, quick turnaround, and zero technical headaches. Our walk-in inquiries and membership requests became much easier to manage.',
    initials: 'RS',
    accent: '#F59E0B',
  },
  {
    id: 'siddharth-nair',
    name: 'Siddharth Nair',
    role: 'Digital Agency Partner',
    quote:
      'Rare combination of strong frontend craft and practical backend thinking. Gaurav ships production builds on time without needing hand-holding.',
    initials: 'SN',
    accent: '#6366F1',
  },
];
