'use client';

import Link from 'next/link';
import { actions, useI18n, useShop } from '@/lib/store';

export function Toast() {
  const { toast } = useShop();
  const { t } = useI18n();
  return (
    <div role="status" aria-live="polite">
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-60 flex -translate-x-1/2 animate-[ps-toast_.25s_ease-out] items-center gap-4 rounded-[2px] bg-ink px-5 py-3.5 text-sm leading-[1.3] font-medium whitespace-nowrap text-cream shadow-[0_8px_24px_rgba(42,26,20,.25)]">
          {toast}
          <Link href="/cart" onClick={actions.hideToast} className="py-1 font-semibold text-highlight underline underline-offset-[3px]">
            {t.viewCart}
          </Link>
        </div>
      )}
    </div>
  );
}
