'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ProductCard, ProductGrid } from '@/components/ProductCard';
import { filterProducts, isCategory, type SortKey } from '@/lib/catalog';
import { ADULT, CATS, KIDS, type Category } from '@/lib/data';
import { useI18n } from '@/lib/store';

const selectCls = 'rounded-[2px] border border-field bg-paper px-3 py-2.5 text-sm leading-[1.2] font-medium text-ink';

export function ShopView() {
  const { t, num } = useI18n();
  const router = useRouter();
  const raw = useSearchParams().get('cat');
  const cat: Category = isCategory(raw) ? raw : 'all';

  const [q, setQ] = useState('');
  const [size, setSize] = useState('any');
  const [sort, setSort] = useState<SortKey>('pop');

  const list = useMemo(() => filterProducts({ cat, q, size, sort }), [cat, q, size, sort]);
  const title = cat === 'all' ? t.shopTitle : t[`cat_${cat}`];
  const setCat = (c: Category) => router.replace(c === 'all' ? '/shop' : `/shop?cat=${c}`, { scroll: false });
  const clear = () => {
    setQ('');
    setSize('any');
    setCat('all');
  };

  return (
    <section className="shell flex flex-col gap-[22px] pt-[clamp(24px,4vw,48px)] pb-[clamp(40px,6vw,72px)]">
      <div className="flex flex-col gap-1.5">
        <nav aria-label="Breadcrumb" className="text-[13px] leading-none text-muted">
          <Link href="/" className="hover:text-maroon">
            {t.nav_home}
          </Link>{' '}
          / {title}
        </nav>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h1 className="m-0 font-serif text-[clamp(32px,5vw,48px)] leading-[1.1] font-medium text-maroon-deep">{title}</h1>
          <div className="text-sm leading-none text-muted" aria-live="polite">
            {num(list.length)} {t.items}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-[9px] text-sm leading-none font-medium ${
              cat === c ? 'border-maroon bg-maroon text-paper' : 'border-chip bg-transparent text-ink hover:border-maroon'
            }`}
          >
            {t[`cat_${c}`]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 border-y border-line py-3.5">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={80}
          placeholder={t.searchPh}
          aria-label={t.searchPh}
          className="min-w-0 flex-[1_1_220px] rounded-[2px] border border-field bg-paper px-3.5 py-[11px] text-[15px] leading-[1.2] text-ink outline-maroon"
        />
        <label className="flex items-center gap-2 text-sm leading-none font-medium text-muted">
          {t.filterSize}
          <select value={size} onChange={(e) => setSize(e.target.value)} className={selectCls}>
            <option value="any">{t.anySize}</option>
            {[...ADULT, ...KIDS].map((z) => (
              <option key={z} value={String(z)}>
                {num(z)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm leading-none font-medium text-muted">
          {t.sortLabel}
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className={selectCls}>
            <option value="pop">{t.sort_pop}</option>
            <option value="low">{t.sort_low}</option>
            <option value="high">{t.sort_high}</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3.5 py-12 text-center">
          <div className="text-base leading-normal text-muted">{t.noResults}</div>
          <button type="button" onClick={clear} className="btn-outline px-5 py-3 text-sm">
            {t.clear}
          </button>
        </div>
      ) : (
        <ProductGrid>
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductGrid>
      )}
    </section>
  );
}
