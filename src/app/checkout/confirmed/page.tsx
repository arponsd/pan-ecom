import type { Metadata } from 'next';
import { ConfirmedView } from '@/components/views/ConfirmedView';

export const metadata: Metadata = { title: 'Order placed', robots: { index: false } };

export default function Page() {
  return <ConfirmedView />;
}
