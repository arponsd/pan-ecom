'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { pageTitle, Totals, ZonePicker } from '@/components/OrderParts';
import { ProductImage } from '@/components/ProductImage';
import { cartTotals, getProduct, normalisePhone } from '@/lib/catalog';
import { DISTRICTS, type PayMethod } from '@/lib/data';
import { actions, useI18n, useShop } from '@/lib/store';
import { EmptyCart } from './CartView';

interface Form {
  name: string;
  phone: string;
  district: string;
  address: string;
  note: string;
  trx: string;
}

type Errors = Partial<Record<keyof Form, true>>;

export function CheckoutView() {
  const { cart, zone, hydrated } = useShop();
  const { lang, t, li, num, tk } = useI18n();
  const router = useRouter();
  const { count, subtotal, fee, total } = cartTotals(cart, zone);

  const [f, setF] = useState<Form>({ name: '', phone: '', district: DISTRICTS[0][0], address: '', note: '', trx: '' });
  const [pay, setPay] = useState<PayMethod>('cod');
  const [err, setErr] = useState('');
  const [invalid, setInvalid] = useState<Errors>({});
  // Guards against double submission while navigating to the confirmation page.
  const placing = useRef(false);
  const [placed, setPlaced] = useState(false);

  const field = (k: keyof Form) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setF((s) => ({ ...s, [k]: v }));
    setErr('');
    setInvalid((s) => ({ ...s, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (placing.current) return;
    const phone = normalisePhone(f.phone);
    const bad: Errors = {};
    if (!f.name.trim()) bad.name = true;
    if (!phone) bad.phone = true;
    if (!f.address.trim()) bad.address = true;
    if (Object.keys(bad).length) {
      setInvalid(bad);
      setErr(t.errReq);
      return;
    }
    if (pay !== 'cod' && !/^[A-Za-z0-9]{8,12}$/.test(f.trx.trim())) {
      setInvalid({ trx: true });
      setErr(t.errTrx);
      return;
    }
    placing.current = true;
    setPlaced(true);
    actions.placeOrder({ total, pay, phone: phone!, zone, items: cart });
    router.replace('/checkout/confirmed');
  };

  if (!hydrated || placed) {
    return (
      <section className="shell min-h-[60vh] pt-[clamp(24px,4vw,48px)]" aria-busy="true">
        <h1 className={pageTitle}>{t.coTitle}</h1>
      </section>
    );
  }

  if (count === 0) {
    return (
      <section className="shell flex flex-col gap-6 pt-[clamp(24px,4vw,48px)] pb-[clamp(40px,6vw,72px)]">
        <h1 className={pageTitle}>{t.cartTitle}</h1>
        <EmptyCart />
      </section>
    );
  }

  const h2 = 'm-0 font-serif text-[26px] leading-[1.2] font-medium text-maroon-deep';
  const walletName = pay === 'bkash' ? t.pay_bkash : t.pay_nagad;
  const payOpts: [PayMethod, string, string][] = [
    ['cod', t.pay_cod, t.pay_cod_d],
    ['bkash', t.pay_bkash, t.pay_wallet_d],
    ['nagad', t.pay_nagad, t.pay_wallet_d],
  ];

  return (
    <section className="shell flex flex-col gap-6 pt-[clamp(24px,4vw,48px)] pb-[clamp(40px,6vw,72px)]">
      <div className="flex flex-col gap-2">
        <Link href="/cart" className="self-start py-1.5 text-sm leading-none font-medium text-muted hover:text-maroon">
          ← {t.cartTitle}
        </Link>
        <h1 className={pageTitle}>{t.coTitle}</h1>
      </div>

      <form noValidate onSubmit={submit} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(24px,4vw,48px)]">
        <div className="flex min-w-0 flex-col gap-8">
          <fieldset className="m-0 flex flex-col gap-3.5 border-0 p-0">
            <legend className={`${h2} mb-3.5`}>1. {t.coContact}</legend>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3.5">
              <label className="field-label">
                {t.name}
                <input className="field" value={f.name} onChange={field('name')} autoComplete="name" maxLength={80} aria-invalid={!!invalid.name} />
              </label>
              <label className="field-label">
                {t.phone}
                <input
                  className="field"
                  value={f.phone}
                  onChange={field('phone')}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={16}
                  placeholder="01XXXXXXXXX"
                  aria-invalid={!!invalid.phone}
                />
              </label>
            </div>
            <div className="field-label">
              {t.deliverTo}
              <ZonePicker zone={zone} />
            </div>
            {zone === 'out' && (
              <label className="field-label">
                {t.district}
                <select className="field" value={f.district} onChange={field('district')}>
                  {DISTRICTS.map((d) => (
                    <option key={d[0]} value={d[0]}>
                      {d[li]}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="field-label">
              {t.address}
              <textarea
                className="field resize-y leading-[1.4]"
                value={f.address}
                onChange={field('address')}
                rows={3}
                maxLength={300}
                autoComplete="street-address"
                placeholder={t.addrPh}
                aria-invalid={!!invalid.address}
              />
            </label>
            <label className="field-label">
              {t.note}
              <input className="field" value={f.note} onChange={field('note')} maxLength={200} />
            </label>
          </fieldset>

          <fieldset className="m-0 flex flex-col gap-3.5 border-0 p-0">
            <legend className={`${h2} mb-3.5`}>2. {t.coPayment}</legend>
            <div role="radiogroup" className="flex flex-col gap-2.5">
              {payOpts.map(([k, title, desc]) => {
                const on = pay === k;
                return (
                  <button
                    key={k}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      setPay(k);
                      setErr('');
                    }}
                    className={`flex items-center gap-3.5 rounded-[2px] border px-[18px] py-4 text-left ${on ? 'border-maroon bg-paper' : 'border-field bg-white hover:border-maroon'}`}
                  >
                    <span className="flex size-5 flex-none items-center justify-center rounded-full border-[1.5px] border-maroon">
                      <span className={`size-2.5 rounded-full ${on ? 'bg-maroon' : 'bg-transparent'}`} />
                    </span>
                    <span className="flex flex-col gap-[3px]">
                      <span className="text-[15px] leading-[1.2] font-semibold text-ink">{title}</span>
                      <span className="text-[13px] leading-[1.35] text-muted">{desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {pay !== 'cod' && (
              <div className="flex flex-col gap-3 rounded-[2px] border border-dashed border-gold bg-paper px-[18px] py-4">
                <div className="text-sm leading-normal text-pretty text-ink">
                  {t.walletInstr.replace('{total}', tk(total)).replace('{wallet}', walletName)}
                </div>
                <label className="field-label">
                  {t.trx}
                  <input
                    className="field bg-white font-mono font-medium tracking-[.05em] uppercase"
                    value={f.trx}
                    onChange={field('trx')}
                    maxLength={12}
                    placeholder="8N7A6D5XQ2"
                    aria-invalid={!!invalid.trx}
                  />
                </label>
              </div>
            )}
          </fieldset>
        </div>

        <div className="sticky top-[140px] flex flex-col gap-4 rounded-[2px] border border-line bg-paper p-6">
          <h2 className="m-0 font-serif text-2xl leading-[1.2] font-medium text-maroon-deep">{t.summary}</h2>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {cart.map((c) => {
              const p = getProduct(c.id);
              if (!p) return null;
              return (
                <li key={`${c.id}-${c.size}`} className="flex items-center gap-3">
                  <ProductImage productId={p.id} color={p.color} alt="" sizes="48px" className="aspect-[3/4] w-12 flex-none rounded-[2px]" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="text-sm leading-[1.3] font-medium">{p[lang]}</div>
                    <div className="text-xs leading-[1.3] text-muted">
                      {t.size} {num(c.size)} × {num(c.qty)}
                    </div>
                  </div>
                  <div className="text-sm leading-[1.3] font-semibold whitespace-nowrap">{tk(p.price * c.qty)}</div>
                </li>
              );
            })}
          </ul>
          <Totals subtotal={subtotal} fee={fee} total={total} deliveryLabel={zone === 'in' ? t.zoneIn : t.zoneOut} />
          {err && (
            <div role="alert" className="text-[13px] leading-[1.4] font-medium text-danger">
              {err}
            </div>
          )}
          <button type="submit" className="btn-primary px-5 py-4">
            {t.placeOrder} · {tk(total)}
          </button>
        </div>
      </form>
    </section>
  );
}
