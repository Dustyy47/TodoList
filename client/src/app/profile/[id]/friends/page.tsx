'use client';

import { StateNavbar } from '@/components/molecules/StateNavbar';
import { AllUsersSearch } from '@/components/organisms/AllUsersSearch';
import { FriendsRequestsSearch } from '@/components/organisms/FriendsRequestsSearch';
import { FriendsSearch } from '@/components/organisms/FriendsSearch';
import { ProfileContainer } from '@/components/organisms/ProfileContainer';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type SearchMode = 'allUsers' | 'friends' | 'requests';

export default function FriendsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const path = `/profile/${id}/friends?`;
  const searchParams = useSearchParams();
  let mode = (searchParams.get('mode') || 'allUsers') as SearchMode;

  const navlinks = useMemo(
    () => [
      {
        link: path + 'mode=allUsers',
        name: 'Все пользователи',
        isActive: mode === 'allUsers'
      },
      {
        link: path + 'mode=friends',
        name: 'Друзья',
        isActive: mode === 'friends'
      },
      {
        link: path + 'mode=requests',
        name: 'Запросы',
        isActive: mode === 'requests'
      }
    ],
    [id, searchParams]
  );

  function renderSearch() {
    if (mode === 'allUsers') {
      return <AllUsersSearch />;
    }
    if (mode === 'friends') {
      return <FriendsSearch />;
    }
    if (mode === 'requests') {
      return <FriendsRequestsSearch />;
    }
  }

  return (
    <ProfileContainer id={id}>
      <div className='max-w-[44.5625rem] w-full flex flex-col self-center'>
        <div className='flex justify-center mb-10'>
          <StateNavbar navLinks={navlinks} />
        </div>
        {renderSearch()}
      </div>
    </ProfileContainer>
  );
}
