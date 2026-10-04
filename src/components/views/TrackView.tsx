'use client';

import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { pageTitle } from '@/components/OrderParts';
import { normalisePhone } from '@/lib/catalog';
import { ORDERS } from '@/lib/data';
import { useI18n, useShop, type PlacedOrder } from '@/lib/store';

type Lookup = { id: string; status: number } | 'missing' | null;

/** Finds an order by ID (and mobile number, when given) among this browser's orders and the demo history. */
function lookupOrder(rawId: string, rawPhone: string, placed: PlacedOrder[]): Lookup {
  const id = rawId.trim().toUpperCase();
  if (!id) return null;
  const phone = rawPhone.trim() ? normalisePhone(rawPhone) : null;
  if (rawPhone.trim() && !phone) return 'missing';
  const own = placed.find((o) => o.id === id);
  // Orders placed in this session are always at step 1 until a real backend updates them.
  const hit = own ? { phone: own.phone, status: 1 } : ORDERS.find((o) => o.id === id);
  if (!hit || (phone && hit.phone !== phone)) return 'missing';
  return { id, status: hit.status };
}

export function TrackView() {
  const { orders, hydrated } = useShop();
  const { t, num } = useI18n();
  const params = useSearchParams();

  const [orderId, setOrderId] = useState(params.get('id') ?? '');
  const [phone, setPhone] = useState(params.get('phone') ?? '');
  const [submitted, setSubmitted] = useState<{ id: string; phone: string } | null>(
    params.get('id') ? { id: params.get('id')!, phone: params.get('phone') ?? '' } : null,
  );
  const [idErr, setIdErr] = useState(false);

  // Recomputed after hydration so orders saved in localStorage are found.
  const result: Lookup = submitted && hydrated ? lookupOrder(submitted.id, submitted.phone, orders) : null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setIdErr(true);
      setSubmitted(null);
      return;
    }
    setIdErr(false);
    setSubmitted({ id: orderId, phone });
  };

  const stepAt = result && result !== 'missing' ? result.status : 0;

  return (
    <section className="mx-auto flex max-w-[760px] flex-col gap-7 px-[clamp(16px,4vw,40px)] py-[clamp(32px,6vw,72px)]">
      <div className="flex flex-col gap-2.5">
        <h1 className={pageTitle}>{t.trackTitle}</h1>
        <p className="m-0 text-base leading-[1.55] text-muted">{t.trackSub}</p>
      </div>

      <form noValidate onSubmit={submit} className="flex flex-col gap-2">
        <div className="flex flex-wrap items-end gap-3">
          <label className="field-label flex-[1_1_200px]">
            {t.orderId}
            <input
              className="field font-mono font-medium uppercase"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              maxLength={20}
              placeholder="PS-48213"
              aria-invalid={idErr}
            />
          </label>
          <label className="field-label flex-[1_1_200px]">
            {t.phone}
            <input
              className="field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              inputMode="numeric"
              maxLength={16}
              placeholder="01XXXXXXXXX"
            />
          </label>
          <button type="submit" className="btn-primary h-[47px] px-7">
            {t.trackBtn}
          </button>
        </div>
        {idErr && (
          <div role="alert" className="text-[13px] font-medium text-danger">
            {t.trackErrId}
          </div>
        )}
      </form>

      {result === 'missing' && (
        <div role="alert" className="rounded-[2px] border border-line bg-paper px-6 py-5 text-[15px] leading-normal text-muted">
          {t.trackNotFound}
        </div>
      )}

      {result && result !== 'missing' && (
        <div className="flex flex-col gap-6 rounded-[2px] border border-line bg-paper p-[clamp(20px,3vw,32px)]">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="font-mono text-lg leading-[1.2] font-semibold">{result.id}</div>
            <div className="text-sm leading-[1.3] font-medium text-maroon">{t[`st${stepAt as 1 | 2 | 3 | 4}`]}</div>
          </div>
          <ol className="m-0 flex list-none flex-col p-0">
            {([1, 2, 3, 4] as const).map((n) => {
              const done = n <= stepAt;
              return (
                <li key={n} className="flex gap-4" aria-current={n === stepAt ? 'step' : undefined}>
                  <div className="flex w-[18px] flex-none flex-col items-center">
                    <span className={`size-[18px] flex-none rounded-full border-[1.5px] ${done ? 'border-maroon bg-maroon' : 'border-chip bg-paper'}`} />
                    <span className={`min-h-7 w-[1.5px] flex-1 ${n === 4 ? 'bg-transparent' : n < stepAt ? 'bg-maroon' : 'bg-line'}`} />
                  </div>
                  <div className="-mt-px flex flex-col gap-[3px] pb-[22px]">
                    <div className={`text-[15px] leading-[1.2] font-semibold ${done ? 'text-ink' : 'text-faint'}`}>
                      <span className="sr-only">{num(n)}. </span>
                      {t[`st${n}`]}
                    </div>
                    <div className="text-[13px] leading-[1.4] text-muted">{t[`st${n}d`]}</div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="border-t border-line pt-4 text-sm leading-normal text-muted">{t.trackHelp}</div>
        </div>
      )}
    </section>
  );
}
