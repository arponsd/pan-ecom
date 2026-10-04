'use client';

import { useEffect } from 'react';
import { useShop } from '@/lib/store';

/** Keeps <html lang> in step with the EN / বাংলা toggle. */
export function LangSync() {
  const { lang } = useShop();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
