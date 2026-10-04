'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { cartTotals } from '@/lib/catalog';
import { actions, useI18n, useShop } from '@/lib/store';

export function Header() {
  const { lang, cart, zone } = useShop();
  const { t, num } = useI18n();
  const { count } = cartTotals(cart, zone);

  const langBtn = (active: boolean) =>
    `rounded-[1px] px-2.5 py-1.5 text-xs leading-none font-semibold ${active ? 'bg-maroon text-paper' : 'bg-transparent text-ink'}`;

  return (
    <>
      <div className="bg-maroon-deep px-4 py-[9px] text-center text-[13px] leading-[1.4] font-medium text-pretty text-cream">
        {t.announce}
      </div>

      <header className="sticky top-0 z-20 border-b border-line bg-paper">
        <div className="shell grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3.5">
          <div className="flex items-center gap-1 justify-self-start rounded-[2px] border border-field p-[3px]">
            <button type="button" aria-pressed={lang === 'en'} onClick={() => actions.setLang('en')} className={langBtn(lang === 'en')}>
              EN
            </button>
            <button type="button" aria-pressed={lang === 'bn'} onClick={() => actions.setLang('bn')} className={langBtn(lang === 'bn')}>
              বাংলা
            </button>
          </div>

          <Link href="/" className="flex flex-col items-center gap-0.5 text-center">
            <span className="font-serif text-[clamp(24px,4vw,34px)] leading-none font-semibold tracking-[.01em] whitespace-nowrap text-maroon">
              {t.brand}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] leading-none font-medium tracking-[.18em] text-gold uppercase">
              <span className="h-px w-[18px] bg-gold" />
              {t.since}
              <span className="h-px w-[18px] bg-gold" />
            </span>
          </Link>

          <div className="flex items-center gap-1.5 justify-self-end">
            <Link href="/account" aria-label={t.account} className="flex size-11 items-center justify-center text-ink">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              </svg>
            </Link>
            <Link href="/cart" aria-label={`${t.cart} (${count})`} className="relative flex size-11 items-center justify-center text-ink">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M5 8h14l-1.2 12H6.2z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              {count > 0 && (
                <span className="absolute top-1 right-0.5 h-[18px] min-w-[18px] rounded-[9px] bg-maroon px-1 text-center text-[11px] leading-[18px] font-semibold text-paper">
                  {num(count)}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="overflow-x-auto border-t border-line-soft">
          <div className="shell flex min-w-max justify-center gap-[clamp(18px,3vw,36px)]">
            <Suspense fallback={<NavLinks active="" />}>
              <ActiveNavLinks />
            </Suspense>
          </div>
        </nav>
      </header>
    </>
  );
}

function ActiveNavLinks() {
  const pathname = usePathname();
  const cat = useSearchParams().get('cat');
  const active =
    pathname === '/'
      ? 'home'
      : pathname === '/track'
        ? 'track'
        : pathname === '/shop'
          ? cat === 'eid' || cat === 'kids'
            ? cat
            : 'all'
          : '';
  return <NavLinks active={active} />;
}

function NavLinks({ active }: { active: string }) {
  const { t } = useI18n();
  const links: [string, string, string][] = [
    ['home', t.nav_home, '/'],
    ['all', t.nav_shop, '/shop'],
    ['eid', t.nav_eid, '/shop?cat=eid'],
    ['kids', t.nav_kids, '/shop?cat=kids'],
    ['track', t.nav_track, '/track'],
  ];
  return links.map(([key, label, href]) => (
    <Link
      key={key}
      href={href}
      aria-current={active === key ? 'page' : undefined}
      className={`border-b-2 py-3 text-sm leading-none font-medium whitespace-nowrap ${
        active === key ? 'border-maroon text-maroon' : 'border-transparent text-ink hover:text-maroon'
      }`}
    >
      {label}
    </Link>
  ));
}
