import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductView } from '@/components/views/ProductView';
import { getProduct } from '@/lib/catalog';
import { PRODUCTS } from '@/lib/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: PageProps<'/product/[id]'>): Promise<Metadata> {
  const p = getProduct(Number((await params).id));
  return p ? { title: p.en, description: `${p.en} — ৳${p.price.toLocaleString('en-US')}. Cash on delivery across Bangladesh.` } : {};
}

export default async function Page({ params }: PageProps<'/product/[id]'>) {
  const p = getProduct(Number((await params).id));
  if (!p) notFound();
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <ProductView key={p.id} productId={p.id} />
    </Suspense>
  );
}
