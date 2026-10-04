'use client';

import Link from 'next/link';
import { pageTitle, Totals, ZonePicker } from '@/components/OrderParts';
import { ProductImage } from '@/components/ProductImage';
import { QtyStepper } from '@/components/QtyStepper';
import { cartTotals, getProduct } from '@/lib/catalog';
import { actions, useI18n, useShop } from '@/lib/store';

export function CartView() {
  const { cart, zone, hydrated } = useShop();
  const { lang, t, num, tk } = useI18n();
  const { count, subtotal, fee, total } = cartTotals(cart, zone);

  return (
    <section className="shell flex flex-col gap-6 pt-[clamp(24px,4vw,48px)] pb-[clamp(40px,6vw,72px)]">
      <h1 className={pageTitle}>{t.cartTitle}</h1>

      {!hydrated ? (
        <div className="min-h-60" aria-busy="true" />
      ) : count === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(24px,4vw,48px)]">
          <ul className="m-0 flex min-w-0 list-none flex-col border-t border-line p-0">
            {cart.map((c, i) => {
              const p = getProduct(c.id);
              if (!p) return null;
              const href = `/product/${p.id}?size=${c.size}`;
              return (
                <li key={`${c.id}-${c.size}`} className="flex gap-4 border-b border-line py-[18px]">
                  <Link href={href} aria-hidden tabIndex={-1} className="w-[clamp(76px,14vw,104px)] flex-none">
                    <ProductImage productId={p.id} color={p.color} alt="" sizes="104px" className="aspect-[3/4] rounded-[2px]" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <div className="flex justify-between gap-3">
                      <Link href={href} className="text-base leading-[1.35] font-medium hover:text-maroon">
                        {p[lang]}
                      </Link>
                      <div className="text-base leading-[1.35] font-semibold whitespace-nowrap">{tk(p.price * c.qty)}</div>
                    </div>
                    <div className="text-[13px] leading-[1.3] text-muted">
                      {t.size}: {num(c.size)} · {tk(p.price)}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1.5">
                      <QtyStepper size="sm" value={c.qty} onChange={(n) => actions.setQty(i, n)} />
                      <button type="button" onClick={() => actions.removeLine(i)} className="py-2 text-[13px] leading-none font-medium text-muted underline underline-offset-[3px] hover:text-maroon">
                        {t.remove}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="sticky top-[140px] flex flex-col gap-4 rounded-[2px] border border-line bg-paper p-6">
            <div className="text-sm leading-none font-semibold">{t.deliverTo}</div>
            <ZonePicker zone={zone} stacked />
            <Totals subtotal={subtotal} fee={fee} total={total} />
            <Link href="/checkout" className="btn-primary px-5 py-4 text-center">
              {t.checkout}
            </Link>
            <div className="text-center text-[13px] leading-[1.4] text-muted">{t.payAvail}</div>
          </div>
        </div>
      )}
    </section>
  );
}

export function EmptyCart() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-start gap-4 border-t border-line py-14">
      <div className="text-[17px] leading-normal text-muted">{t.cartEmpty}</div>
      <Link href="/shop" className="btn-primary px-6 py-3.5">
        {t.continueShop}
      </Link>
    </div>
  );
}
