'use client';

import { useVisitedUser } from '@/hooks';
import { useEffect } from 'react';

export default function VisitedPageLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const { fetchVisitedUser } = useVisitedUser();

  useEffect(() => {
    fetchVisitedUser(id);
  }, [id]);

  return <>{children}</>;
}
