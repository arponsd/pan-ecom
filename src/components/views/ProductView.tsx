'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ProductCard, ProductGrid } from '@/components/ProductCard';
import { QtyStepper } from '@/components/QtyStepper';
import { ProductImage } from '@/components/ProductImage';
import { getProduct, inkFor, relatedProducts, sizesFor } from '@/lib/catalog';
import { PRODUCT_PHOTOS } from '@/lib/photos';
import { FAB, FEE } from '@/lib/data';
import { actions, useI18n } from '@/lib/store';

export function ProductView({ productId }: { productId: number }) {
  const p = getProduct(productId)!;
  const { lang, t, li, num, tk } = useI18n();
  const router = useRouter();
  const sizes = sizesFor(p);
  const preselect = Number(useSearchParams().get('size'));

  const [selSize, setSelSize] = useState<number | null>(sizes.includes(preselect) ? preselect : null);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [sizeErr, setSizeErr] = useState(false);

  // With a real photo we show it full and as a close-up; the back view only exists as a placeholder.
  const hasPhoto = !!PRODUCT_PHOTOS[p.id];
  const imgLabels = hasPhoto ? [t.imgFront, t.imgDetail] : [t.imgFront, t.imgDetail, t.imgBack];

  const addCurrent = () => {
    if (!selSize) {
      setSizeErr(true);
      return false;
    }
    actions.addToCart(p.id, selSize, qty);
    return true;
  };

  return (
    <section className="shell flex flex-col gap-[clamp(40px,6vw,72px)] pt-[clamp(20px,3vw,36px)] pb-[clamp(40px,6vw,72px)]">
      <div className="flex flex-col gap-[18px]">
        <Link href="/shop" className="self-start py-1.5 text-sm leading-none font-medium text-muted hover:text-maroon">
          ← {t.backShop}
        </Link>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(24px,4vw,56px)]">
          <div className="flex flex-col gap-3">
            <ProductImage
              productId={p.id}
              color={p.color}
              alt={`${p[lang]} · ${imgLabels[imgIdx]}`}
              label={`${t.photo} · ${imgLabels[imgIdx]}`}
              sizes="(max-width: 860px) 100vw, 590px"
              priority
              zoom={imgIdx === 1}
              className="aspect-[4/5] rounded-[2px] p-4"
              labelClassName="text-[11px] opacity-80"
            />
            <div className="grid grid-cols-3 gap-3">
              {imgLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={imgIdx === i}
                  onClick={() => setImgIdx(i)}
                  aria-label={label}
                  className="relative flex aspect-square items-end justify-center overflow-hidden rounded-[2px] border-2 pb-2"
                  style={{ backgroundColor: p.color, borderColor: imgIdx === i ? '#6E1423' : 'transparent' }}
                >
                  {hasPhoto ? (
                    <div className="absolute inset-0">
                      <ProductImage productId={p.id} color={p.color} alt="" sizes="190px" zoom={i === 1} className="size-full" />
                    </div>
                  ) : (
                    <span className="font-mono text-[10px] leading-none font-medium opacity-80" style={{ color: inkFor(p.color) }}>
                      {label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[22px]">
            <div className="flex flex-col gap-2.5">
              <div className="text-xs leading-none font-semibold tracking-[.14em] text-gold uppercase">{t[`cat_${p.cat}`]}</div>
              <h1 className="m-0 font-serif text-[clamp(32px,4.5vw,46px)] leading-[1.1] font-medium text-balance text-maroon-deep">{p[lang]}</h1>
              <div className="text-2xl leading-[1.2] font-semibold text-maroon">{tk(p.price)}</div>
            </div>

            <div className="flex flex-wrap gap-7 text-sm leading-[1.4] text-muted">
              <div>
                {t.fabric}: <span className="font-medium text-ink">{FAB[p.fab][li]}</span>
              </div>
              <div>
                {t.colour}: <span className="font-medium text-ink">{p.col[li]}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-baseline justify-between">
                <div id="size-label" className="text-sm leading-none font-semibold">
                  {t.size}
                </div>
                <button type="button" onClick={actions.openSizeGuide} className="py-1 text-sm leading-none font-medium text-maroon underline underline-offset-[3px]">
                  {t.sizeGuide}
                </button>
              </div>
              <div role="radiogroup" aria-labelledby="size-label" className="flex flex-wrap gap-2">
                {sizes.map((z) => (
                  <button
                    key={z}
                    type="button"
                    role="radio"
                    aria-checked={selSize === z}
                    onClick={() => {
                      setSelSize(z);
                      setSizeErr(false);
                    }}
                    className={`h-12 min-w-14 rounded-[2px] border px-3 text-[15px] leading-none font-semibold ${
                      selSize === z ? 'border-maroon bg-maroon text-paper' : 'border-field bg-paper text-ink hover:border-maroon'
                    }`}
                  >
                    {num(z)}
                  </button>
                ))}
              </div>
              {sizeErr && (
                <div role="alert" className="text-[13px] leading-[1.3] font-medium text-danger">
                  {t.selectSize}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-stretch gap-3">
              <QtyStepper value={qty} onChange={setQty} />
              <button
                type="button"
                onClick={() => addCurrent() && actions.showToast(t.added)}
                className="btn-outline min-h-[50px] flex-[1_1_160px] px-5"
              >
                {t.addCart}
              </button>
              <button
                type="button"
                onClick={() => addCurrent() && router.push('/checkout')}
                className="btn-primary min-h-[50px] flex-[1_1_160px] px-5"
              >
                {t.buyNow}
              </button>
            </div>

            <div className="flex flex-col gap-2.5 rounded-[2px] border border-line bg-paper px-5 py-[18px] text-sm leading-[1.45]">
              <div className="leading-none font-semibold">{t.delTitle}</div>
              <div className="flex flex-wrap justify-between gap-3">
                <span>
                  {t.zoneIn} · {t.daysIn}
                </span>
                <span className="font-semibold">{tk(FEE.in)}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-3">
                <span>
                  {t.zoneOut} · {t.daysOut}
                </span>
                <span className="font-semibold">{tk(FEE.out)}</span>
              </div>
              <div className="border-t border-line pt-2.5 text-muted">{t.payAvail}</div>
            </div>

            <div className="flex flex-col gap-2 border-t border-line pt-[18px]">
              <div className="text-sm leading-none font-semibold">{t.details}</div>
              <p className="m-0 text-[15px] leading-[1.6] text-pretty text-muted">
                {t.fitTxt} {t.careTxt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[22px]">
        <h2 className="m-0 font-serif text-[clamp(26px,3.5vw,36px)] leading-[1.1] font-medium text-maroon-deep">{t.related}</h2>
        <ProductGrid>
          {relatedProducts(p).map((r) => (
            <ProductCard key={r.id} product={r} showFabric={false} />
          ))}
        </ProductGrid>
      </div>
    </section>
  );
}
