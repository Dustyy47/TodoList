'use client';

import { useState } from 'react';

import FriendsAPI from '@/http/FriendsAPI';
import UserAPI from '@/http/UserAPI';
import { FriendRequestStatus, UserData } from '@/types';

export function useFriends() {
  const [loading, setLoading] = useState(false);
  const [foundedUsers, setFoundedUsers] = useState<UserData[]>([]);
  const [foundedFriends, setFoundedRequests] = useState<UserData[]>([]);
  // const [foundedRequests, setFoundedRequests] = useState<UserData[]>([]);

  async function search(searchId: string, limit: number = 5) {
    const users = await UserAPI.getUsers(searchId, limit);
    if (users) setFoundedUsers(users);
  }

  async function searchFriend() {
    const friends = await FriendsAPI.getFriends();
    if (friends) setFoundedRequests(friends);
  }

  async function sendRequest(targetUserId: string) {
    setLoading(true);
    await FriendsAPI.sendRequest(targetUserId);
    setLoading(false);
  }

  async function getRequests() {
    return await FriendsAPI.getRequests();
  }

  async function updateRequest(
    targetUserId: string,
    status: FriendRequestStatus
  ) {
    setLoading(true);
    await FriendsAPI.updateRequest(targetUserId, status);
    setLoading(false);
  }

  return {
    search,
    searchFriend,
    foundedUsers,
    foundedFriends,
    loading,
    getRequests,
    sendRequest,
    updateRequest
  };
}
