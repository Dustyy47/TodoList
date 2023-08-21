import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { UserInfo } from '../molecules/UserInfo';

export function Header() {
  const { user } = useUser();

  return (
    <header className='w-full flex justify-center h-24 bg-white-common'>
      {user && (
        <div className='w-full h-full flex  justify-end items-center max-w-[83.5625rem]'>
          <div className='hover:bg-gray-bg rounded-common p-2 cursor-pointer'>
            <Link href={`/profile/${user?.id}`}>
              {user && <UserInfo data={user} />}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
