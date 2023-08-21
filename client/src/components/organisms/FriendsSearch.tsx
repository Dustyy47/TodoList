import { useFriends } from '@/hooks/useFriends';
import { UserData } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserCard } from '../molecules/UserCard';

export function FriendsSearch() {
  const { searchFriend, foundedFriends } = useFriends();

  const router = useRouter();

  useEffect(() => {
    searchFriend();
  }, []);

  // async function handleSearch(searchId: string) {
  //   await searchFriend();
  // }
  function handleClickUserCard(user: UserData) {
    router.push(`/profile/${user.id}`);
  }

  return (
    <>
      {/* <div className='w-full float-left mb-5'>
        <Search onChange={handleSearch} />
      </div> */}
      <div className='w-full'>
        {foundedFriends.map((friend) => (
          <div key={friend.id} className='mb-2 w-full'>
            <UserCard onClick={handleClickUserCard} data={friend} />
          </div>
        ))}
      </div>
    </>
  );
}
