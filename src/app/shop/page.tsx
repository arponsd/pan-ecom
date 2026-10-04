import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopView } from '@/components/views/ShopView';

export const metadata: Metadata = { title: 'Shop all panjabis' };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[70vh]" />}>
      <ShopView />
    </Suspense>
  );
}
