'use client';

import { useAppDispatch } from '@/store';
import { usersActions } from '@/store/slices';
import { useEffect } from 'react';
import { Header } from '../organisms/Header';

export function AuthContainer({ children }: { children: React.ReactNode }) {
  'use client';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.fetchUser());
  }, []);

  return (
    <div className='flex flex-col'>
      <Header />
      {children}
    </div>
  );
}
