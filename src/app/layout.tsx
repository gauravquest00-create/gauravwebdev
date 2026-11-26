import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { BlueprintProvider } from '@/context/BlueprintContext';
import { ToastProvider } from '@/context/ToastContext';
import { ThreeBackground } from '@/components/effects/ThreeBackground';
import { BlueprintEntry } from '@/components/effects/BlueprintEntry';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';
import { GlassSidebar } from '@/components/layout/GlassSidebar';
import { MobileBottomDock } from '@/components/layout/MobileBottomDock';
import { SectionIndicator } from '@/components/layout/SectionIndicator';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { DEVELOPER_PROFILE } from '@/data/profile';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${DEVELOPER_PROFILE.brandTitle} | Next.js, React & MERN Stack`,
    template: `%s | ${DEVELOPER_PROFILE.brandTitle}`,
  },
  description: DEVELOPER_PROFILE.subheadline,
  metadataBase: new URL(DEVELOPER_PROFILE.portfolioHubUrl),
  openGraph: {
    title: DEVELOPER_PROFILE.brandTitle,
    description: DEVELOPER_PROFILE.subheadline,
    url: DEVELOPER_PROFILE.portfolioHubUrl,
    siteName: DEVELOPER_PROFILE.brandTitle,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <ToastProvider>
            <BlueprintProvider>
              <ThreeBackground />
              <BlueprintEntry />
              <ScrollProgressBar />
              <GlassSidebar />
              <MobileBottomDock />
              <SectionIndicator />
              <main className="relative z-10 min-h-screen">{children}</main>
              <ToastContainer />
            </BlueprintProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
