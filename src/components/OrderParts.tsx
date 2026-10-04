'use client';

import type { ReactNode } from 'react';
import { FEE, type Zone } from '@/lib/data';
import { actions, useI18n } from '@/lib/store';

export function ZonePicker({ zone, stacked = false }: { zone: Zone; stacked?: boolean }) {
  const { t, tk } = useI18n();
  const opt = (z: Zone, label: string) => {
    const on = zone === z;
    return (
      <button
        type="button"
        role="radio"
        aria-checked={on}
        onClick={() => actions.setZone(z)}
        className={`rounded-[2px] border px-2.5 py-3 text-sm leading-[1.3] font-medium ${
          on ? 'border-maroon bg-maroon text-paper' : 'border-field bg-white text-ink hover:border-maroon'
        }`}
      >
        {label}
        {stacked ? <br /> : ' · '}
        <span className={stacked ? 'font-semibold' : ''}>{tk(FEE[z])}</span>
      </button>
    );
  };
  return (
    <div role="radiogroup" aria-label={t.deliverTo} className="grid grid-cols-2 gap-2">
      {opt('in', t.zoneIn)}
      {opt('out', t.zoneOut)}
    </div>
  );
}

export function Totals({ subtotal, fee, total, deliveryLabel }: { subtotal: number; fee: number; total: number; deliveryLabel?: ReactNode }) {
  const { t, tk } = useI18n();
  return (
    <div className="flex flex-col gap-2.5 border-t border-line pt-4 text-[15px] leading-[1.3]">
      <div className="flex justify-between">
        <span className="text-muted">{t.subtotal}</span>
        <span>{tk(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted">
          {t.delivery}
          {deliveryLabel && <> ({deliveryLabel})</>}
        </span>
        <span>{tk(fee)}</span>
      </div>
      <div className="flex justify-between border-t border-line pt-3 text-[19px] font-semibold">
        <span>{t.total}</span>
        <span className="text-maroon">{tk(total)}</span>
      </div>
    </div>
  );
}

export const pageTitle = 'm-0 font-serif text-[clamp(32px,5vw,48px)] leading-[1.1] font-medium text-maroon-deep';
