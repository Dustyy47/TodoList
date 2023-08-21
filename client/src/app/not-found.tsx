'use client';

import { useUser } from '@/hooks';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { isAuth, user } = useUser();
  const router = useRouter();

  if (isAuth) {
    router.push(`profile/${user?.id}`);
  }

  return <div>123123</div>;
}
