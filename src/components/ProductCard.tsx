'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { FAB, type Product } from '@/lib/data';
import { useI18n } from '@/lib/store';
import { ProductImage } from './ProductImage';

export function ProductCard({ product: p, showFabric = true }: { product: Product; showFabric?: boolean }) {
  const { lang, t, li, tk } = useI18n();
  return (
    <Link href={`/product/${p.id}`} className="group flex flex-col gap-2.5">
      <ProductImage
        productId={p.id}
        color={p.color}
        alt={p[lang]}
        label={t.photo}
        sizes="(max-width: 520px) 46vw, (max-width: 1240px) 25vw, 290px"
        className="aspect-[3/4] rounded-[2px] p-2.5"
      />
      <div className="flex flex-col gap-[3px]">
        <div className="text-[15px] leading-[1.35] font-medium text-pretty group-hover:text-maroon">{p[lang]}</div>
        {showFabric && <div className="text-[13px] leading-[1.3] text-muted">{FAB[p.fab][li]}</div>}
        <div className="pt-0.5 text-base leading-[1.3] font-semibold text-maroon">{tk(p.price)}</div>
      </div>
    </Link>
  );
}

export function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(46%,220px),1fr))] gap-x-[clamp(12px,2vw,24px)] gap-y-[clamp(14px,2vw,28px)]">
      {children}
    </div>
  );
}
