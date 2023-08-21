import { useFriends } from '@/hooks/useFriends';
import { UserData } from '@/types';
import { useRouter } from 'next/navigation';
import { Search } from '../molecules/Search';
import { UserCard } from '../molecules/UserCard';

export function AllUsersSearch() {
  const { search, foundedUsers } = useFriends();

  const router = useRouter();

  async function handleSearch(searchId: string) {
    if (searchId !== '') await search(searchId);
  }
  function handleClickUserCard(user: UserData) {
    router.push(`/profile/${user.id}`);
  }

  return (
    <>
      <div className='w-full float-left mb-5'>
        <Search onChange={handleSearch} />
      </div>
      <div className='w-full'>
        {foundedUsers.map((user) => (
          <div key={user.id} className='mb-2 w-full'>
            <UserCard onClick={handleClickUserCard} data={user} />
          </div>
        ))}
      </div>
    </>
  );
}
