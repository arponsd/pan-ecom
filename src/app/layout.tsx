import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Hind_Siliguri, Noto_Serif_Bengali } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LangSync } from '@/components/LangSync';
import { SizeGuideModal } from '@/components/SizeGuideModal';
import { Toast } from '@/components/Toast';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hind',
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  weight: ['500', '600'],
  variable: '--font-noto-serif-bengali',
});

export const metadata: Metadata = {
  title: {
    default: 'Panjabi Shop — Panjabis for every day, and every Eid',
    template: '%s · Panjabi Shop',
  },
  description:
    'Cotton, linen and khadi panjabis cut for Bangladesh weather. Cash on delivery in all 64 districts, bKash and Nagad accepted.',
};

export const viewport: Viewport = {
  themeColor: '#4A0D18',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${hind.variable} ${notoSerifBengali.variable}`}>
      <body className="font-sans">
        <LangSync />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <SizeGuideModal />
        <Toast />
      </body>
    </html>
  );
}
