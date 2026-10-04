'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCard, ProductGrid } from '@/components/ProductCard';
import { ProductImage } from '@/components/ProductImage';
import { getProduct } from '@/lib/catalog';
import { BEST, CAT_COLORS } from '@/lib/data';
import { CATEGORY_PHOTO_PRODUCT, HERO_PHOTO } from '@/lib/photos';
import { actions, useI18n } from '@/lib/store';

const h2 = 'm-0 font-serif text-[clamp(28px,4vw,40px)] leading-[1.1] font-medium text-maroon-deep';

export function HomeView() {
  const { t, num } = useI18n();
  const trust = [
    [t.tr1t, t.tr1d],
    [t.tr2t, t.tr2d],
    [t.tr3t, t.tr3d],
  ];
  const cats = ['everyday', 'eid', 'printed', 'kids'] as const;

  return (
    <>
      <section className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(28px,5vw,64px)] py-[clamp(28px,6vw,72px)]">
        <div className="flex max-w-[560px] flex-col gap-[22px]">
          <div className="flex items-center gap-2.5 text-xs leading-[1.3] font-semibold tracking-[.14em] text-gold uppercase">
            <span className="h-px w-7 bg-gold" />
            {t.heroKicker}
          </div>
          <h1 className="m-0 font-serif text-[clamp(38px,6vw,64px)] leading-[1.05] font-medium text-balance text-maroon-deep">{t.heroTitle}</h1>
          <p className="m-0 max-w-[46ch] text-[17px] leading-[1.6] text-pretty text-muted">{t.heroSub}</p>
          <div className="flex flex-wrap gap-3 pt-1.5">
            <Link href="/shop" className="btn-primary px-[26px] py-[15px]">
              {t.shopNow}
            </Link>
            <Link href="/shop?cat=eid" className="btn-outline px-6 py-3.5">
              {t.viewEid}
            </Link>
          </div>
        </div>
        <div className="relative w-[min(100%,460px)] justify-self-center">
          <div className="arch absolute inset-[-14px_-14px_14px_14px] border border-gold" />
          <div className="arch relative aspect-[4/5] overflow-hidden bg-[#E6D8C1]">
            <Image src={HERO_PHOTO.src} alt={t.heroPhoto} fill priority sizes="(max-width: 860px) 100vw, 460px" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px] py-[22px]">
          {trust.map(([title, desc], i) => (
            <div key={title} className="flex items-center gap-3.5">
              <div className="flex size-10 flex-none items-center justify-center rounded-full border border-gold font-serif text-lg leading-none font-semibold text-maroon">
                {num(i + 1)}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[15px] leading-[1.3] font-semibold">{title}</div>
                <div className="text-[13px] leading-[1.4] text-muted">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell flex flex-col gap-6 pt-[clamp(40px,6vw,72px)]">
        <h2 className={h2}>{t.catTitle}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(46%,200px),1fr))] gap-[clamp(12px,2vw,24px)]">
          {cats.map((c) => (
            <Link key={c} href={`/shop?cat=${c}`} className="group flex flex-col items-center gap-3">
              <ProductImage
                productId={CATEGORY_PHOTO_PRODUCT[c] ?? 0}
                color={CAT_COLORS[c]}
                alt={t[`cat_${c}`]}
                label={t.photo}
                sizes="(max-width: 520px) 46vw, 290px"
                className="arch aspect-[3/4] w-full justify-center p-3.5"
              />
              <div className="text-base leading-[1.2] font-semibold text-ink group-hover:text-maroon">{t[`cat_${c}`]}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell flex flex-col gap-6 py-[clamp(40px,6vw,72px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className={h2}>{t.best}</h2>
          <Link href="/shop" className="link py-2 text-sm leading-none">
            {t.viewAll}
          </Link>
        </div>
        <ProductGrid>
          {BEST.map((id) => {
            const p = getProduct(id);
            return p && <ProductCard key={id} product={p} />;
          })}
        </ProductGrid>
      </section>

      <section className="shell mb-[clamp(40px,6vw,72px)]">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[2px] bg-maroon p-[clamp(24px,4vw,44px)] text-cream">
          <div className="flex max-w-[560px] flex-col gap-2">
            <h3 className="m-0 font-serif text-[clamp(26px,3.5vw,34px)] leading-[1.15] font-medium">{t.sgPromoT}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-pretty text-sand">{t.sgPromoD}</p>
          </div>
          <button type="button" onClick={actions.openSizeGuide} className="rounded-[2px] bg-cream px-6 py-3.5 text-[15px] leading-none font-semibold text-maroon-deep hover:bg-paper">
            {t.sgOpen}
          </button>
        </div>
      </section>
    </>
  );
}
