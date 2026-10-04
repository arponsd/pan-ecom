import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TrackView } from '@/components/views/TrackView';

export const metadata: Metadata = { title: 'Track your order' };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <TrackView />
    </Suspense>
  );
}
