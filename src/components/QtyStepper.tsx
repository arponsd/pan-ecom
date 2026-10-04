'use client';

import { MAX_QTY } from '@/lib/catalog';
import { useI18n } from '@/lib/store';

export function QtyStepper({ value, onChange, size = 'lg' }: { value: number; onChange: (n: number) => void; size?: 'lg' | 'sm' }) {
  const { t, num } = useI18n();
  const btn = size === 'lg' ? 'h-[50px] w-11 text-xl' : 'size-10 text-lg';
  return (
    <div className="flex items-center rounded-[2px] border border-field bg-paper">
      <button type="button" aria-label={t.qtyDec} disabled={value <= 1} onClick={() => onChange(value - 1)} className={`${btn} leading-none font-medium text-ink disabled:opacity-40`}>
        −
      </button>
      <div aria-live="polite" className={`text-center leading-none font-semibold ${size === 'lg' ? 'min-w-7 text-[15px]' : 'min-w-6 text-sm'}`}>
        {num(value)}
      </div>
      <button type="button" aria-label={t.qtyInc} disabled={value >= MAX_QTY} onClick={() => onChange(value + 1)} className={`${btn} leading-none font-medium text-ink disabled:opacity-40`}>
        +
      </button>
    </div>
  );
}
