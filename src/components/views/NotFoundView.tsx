'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/store';

export function NotFoundView() {
  const { t } = useI18n();
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center gap-5 px-[clamp(16px,4vw,40px)] py-[clamp(48px,10vw,120px)] text-center">
      <div className="font-serif text-[64px] leading-none font-medium text-gold">404</div>
      <h1 className="m-0 font-serif text-[clamp(32px,5vw,44px)] leading-[1.1] font-medium text-maroon-deep">{t.nfTitle}</h1>
      <p className="m-0 text-base leading-[1.6] text-muted">{t.nfSub}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary px-6 py-3.5">
          {t.backHome}
        </Link>
        <Link href="/shop" className="btn-outline px-[22px] py-[13px]">
          {t.shopNow}
        </Link>
      </div>
    </section>
  );
}
