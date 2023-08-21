import { handleFetchError } from '@/helpers';
import { FriendRequestStatus, UserData } from '@/types';
import { $clientHost } from '.';

class FriendsAPI {
  async sendRequest(targetUserId: string) {
    try {
      const data = await $clientHost.post(`/friends/${targetUserId}`);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async updateRequest(targetUserId: string, status: FriendRequestStatus) {
    try {
      const data = await $clientHost.patch(
        `/friends/${targetUserId}`,
        {},
        {
          params: { status }
        }
      );
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async getFriends() {
    try {
      const data = await $clientHost.get<UserData[]>(`friends`);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async getRequests() {
    try {
      const data = await $clientHost.get(`friends/requests`, {
        params: { status: 'WAITING' }
      });
      console.log(data);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }
}

export default new FriendsAPI();
