'use client';

import { useEffect, useRef } from 'react';
import { SG } from '@/lib/data';
import { actions, useI18n, useShop } from '@/lib/store';

export function SizeGuideModal() {
  const { sizeGuideOpen } = useShop();
  const { t, num } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sizeGuideOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && actions.closeSizeGuide();
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [sizeGuideOpen]);

  if (!sizeGuideOpen) return null;

  const head = 'border-b border-ink px-1 py-3 font-semibold';
  const cell = 'border-b border-line px-1 py-3';

  return (
    <div onClick={actions.closeSizeGuide} className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(42,26,20,.55)] p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-[min(100%,520px)] flex-col gap-[18px] overflow-auto rounded-[2px] bg-paper p-[clamp(20px,4vw,32px)]"
      >
        <div className="flex items-center justify-between">
          <h2 id="size-guide-title" className="m-0 font-serif text-[30px] leading-[1.1] font-medium text-maroon-deep">
            {t.sizeGuide}
          </h2>
          <button ref={closeRef} type="button" onClick={actions.closeSizeGuide} aria-label={t.close} className="size-11 text-[26px] leading-none text-ink">
            ×
          </button>
        </div>
        <div className="grid grid-cols-3 border-t border-ink text-[15px] leading-none" role="table">
          <div role="row" className="contents">
            <div role="columnheader" className={head}>{t.size}</div>
            <div role="columnheader" className={head}>{t.sgChest}</div>
            <div role="columnheader" className={head}>{t.sgLength}</div>
          </div>
          {SG.map(([s, c, l]) => (
            <div role="row" key={s} className="contents">
              <div role="cell" className={`${cell} font-semibold`}>{num(s)}</div>
              <div role="cell" className={cell}>{num(c)}</div>
              <div role="cell" className={cell}>{num(l)}</div>
            </div>
          ))}
        </div>
        <p className="m-0 text-sm leading-[1.55] text-pretty text-muted">{t.sgNote}</p>
      </div>
    </div>
  );
}
