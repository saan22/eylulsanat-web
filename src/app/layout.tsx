import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

import { db } from '@/lib/json-db';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await db.settings.get();

  return {
    metadataBase: new URL('https://eylulsanatatolyesi.com.tr'),
    title: {
      default: settings.siteTitle,
      template: `%s | ${settings.siteTitle}`
    },
    description: settings.siteDescription,
    icons: {
      icon: settings.logo || '/favicon.ico',
      apple: settings.logo || '/favicon.ico',
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={clsx(playfair.variable, montserrat.variable)}>
      <body className="font-sans antialiased bg-[#F9F9F9] text-[#333333]">
        {children}
      </body>
    </html>
  );
}
