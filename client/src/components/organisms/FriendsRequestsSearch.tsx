'use client';

import { useFriends } from '@/hooks/useFriends';
import { FriendRequestData, UserData } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FriendRequest } from '../molecules/FriendRequest';

export function FriendsRequestsSearch() {
  const [requests, setRequests] = useState<FriendRequestData[]>();

  const { getRequests, updateRequest } = useFriends();

  const router = useRouter();

  async function fetchRequests() {
    const rq = await getRequests();
    if (rq) setRequests(rq);
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  async function handleAccept(creator: UserData) {
    await updateRequest(creator.id, 'ACCEPTED');
    await fetchRequests();
  }

  async function handleDecline(creator: UserData) {
    await updateRequest(creator.id, 'DECLINED');
    await fetchRequests();
  }

  // async function handleSearch(searchId: string) {
  // await searchFriend();
  // }
  function handleClickUserCard(user: UserData) {
    router.push(`/profile/${user.id}`);
  }

  if (!requests) return;

  return (
    <>
      {/* <div className='w-full float-left mb-5'> */}
      {/* <Search onChange={handleSearch} /> */}
      {/* </div> */}
      <div className='w-full'>
        {requests.map((request) => (
          <div key={request.creatorId} className='mb-2 w-full'>
            <FriendRequest
              onAccept={handleAccept}
              onDecline={handleDecline}
              onClick={handleClickUserCard}
              data={request.creator}
            />
          </div>
        ))}
      </div>
    </>
  );
}
