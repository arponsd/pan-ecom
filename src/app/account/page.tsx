import type { Metadata } from 'next';
import { AccountView } from '@/components/views/AccountView';

export const metadata: Metadata = { title: 'My account' };

export default function Page() {
  return <AccountView />;
}
