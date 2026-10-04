'use client';

import Link from 'next/link';
import { actions, useI18n } from '@/lib/store';

const linkCls = 'py-0.5 text-left text-sm leading-[1.3] text-foot hover:text-paper';
const headCls = 'text-xs leading-none font-semibold tracking-[.14em] text-gold uppercase';

export function Footer() {
  const { t, num } = useI18n();
  const cats = ['everyday', 'eid', 'printed', 'kids'] as const;

  return (
    <footer className="mt-auto bg-ink text-foot">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-8 pt-[clamp(36px,5vw,56px)] pb-7">
        <div className="flex flex-col gap-2.5">
          <div className="font-serif text-[28px] leading-none font-semibold text-cream">{t.brand}</div>
          <p className="m-0 max-w-[32ch] text-sm leading-[1.55] text-chip">{t.footAbout}</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className={headCls}>{t.footShop}</div>
          {cats.map((c) => (
            <Link key={c} href={`/shop?cat=${c}`} className={linkCls}>
              {t[`cat_${c}`]}
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-start gap-2.5">
          <div className={headCls}>{t.footHelp}</div>
          <Link href="/track" className={linkCls}>
            {t.nav_track}
          </Link>
          <button type="button" onClick={actions.openSizeGuide} className={linkCls}>
            {t.sizeGuide}
          </button>
          <Link href="/account" className={linkCls}>
            {t.acctTitle}
          </Link>
          <Link href="/credits" className={linkCls}>
            {t.credits}
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className={headCls}>{t.footPay}</div>
          <div className="flex flex-wrap gap-2">
            {[t.pay_cod, t.pay_bkash, t.pay_nagad].map((p) => (
              <span key={p} className="rounded-[2px] border border-foot-chip px-2.5 py-[7px] text-[13px] leading-none font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="shell border-t border-foot-line pt-[18px] pb-7 text-[13px] leading-[1.4] text-foot-muted">
        © {num(2026)} {t.brand} · {t.footBD}
      </div>
    </footer>
  );
}
