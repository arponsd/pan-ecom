import type { Metadata } from 'next';
import { CreditsView } from '@/components/views/CreditsView';

export const metadata: Metadata = { title: 'Photo credits' };

export default function Page() {
  return <CreditsView />;
}
