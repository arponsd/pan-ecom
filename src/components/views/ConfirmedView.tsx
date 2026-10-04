'use client';

import Link from 'next/link';
import { useI18n, useShop } from '@/lib/store';

export function ConfirmedView() {
  const { orders, lastOrderId, hydrated } = useShop();
  const { t, num, tk } = useI18n();
  const order = orders.find((o) => o.id === lastOrderId);

  if (!hydrated) return <section className="min-h-[60vh]" aria-busy="true" />;

  if (!order) {
    return (
      <section className="mx-auto flex max-w-[640px] flex-col items-center gap-5 px-[clamp(16px,4vw,40px)] py-[clamp(40px,8vw,96px)] text-center">
        <p className="m-0 text-base text-muted">{t.cartEmpty}</p>
        <Link href="/shop" className="btn-primary px-6 py-3.5">
          {t.continueShop}
        </Link>
      </section>
    );
  }

  const payNames = { cod: t.pay_cod, bkash: t.pay_bkash, nagad: t.pay_nagad };
  const label = 'text-xs leading-none text-muted';

  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center gap-[22px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,8vw,96px)] text-center">
      <div className="flex size-16 items-center justify-center rounded-full border border-gold text-maroon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <h1 className="m-0 font-serif text-[clamp(32px,5vw,44px)] leading-[1.1] font-medium text-balance text-maroon-deep">{t.okTitle}</h1>
      <p className="m-0 text-base leading-[1.6] text-pretty text-muted">{t.okSub.replace('{phone}', num(order.phone))}</p>
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4 rounded-[2px] border border-line bg-paper px-6 py-5 text-left">
        <div className="flex flex-col gap-1">
          <span className={label}>{t.orderId}</span>
          <span className="font-mono text-base leading-[1.2] font-semibold">{order.id}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className={label}>{t.total}</span>
          <span className="text-base leading-[1.2] font-semibold">{tk(order.total)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className={label}>{t.coPayment}</span>
          <span className="text-base leading-[1.2] font-semibold">{payNames[order.pay]}</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href={`/track?id=${order.id}&phone=${order.phone}`} className="btn-primary px-6 py-3.5">
          {t.trackThis}
        </Link>
        <Link href="/shop" className="btn-outline px-[22px] py-[13px]">
          {t.continueShop}
        </Link>
      </div>
    </section>
  );
}
