import { handleFetchError } from '@/helpers/handleFetchError';
import { UpdateAccountForm } from '@/hooks';
import { AuthTokenDecoded, SignInDTO, SignUpDTO, UserData } from '@/types';
import jwtDecode from 'jwt-decode';
import { $clientHost } from '.';

class UserAPI {
  async getMe() {
    try {
      const data = await $clientHost.get<UserData>('/account');
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async signUp(dto: SignUpDTO) {
    try {
      let token;
      let data;
      data = await $clientHost.post(`/account/signUp`, { ...dto });
      return {
        token: data.data.access_token
      };
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async signIn(dto: SignInDTO) {
    try {
      let token;
      let data;
      data = await $clientHost.post<{ access_token: string }>(
        `/account/signIn`,
        {
          ...dto
        }
      );
      token = data.data.access_token;
      return {
        data: jwtDecode<AuthTokenDecoded>(token),
        token
      };
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async deleteAccount() {
    try {
      await $clientHost.delete('/account');
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async updateAccount(inputData: UpdateAccountForm) {
    try {
      const data = await $clientHost.put<UserData>('/account', inputData);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async getUser(userId: string) {
    try {
      const data = await $clientHost.get<UserData>(`/account/users/${userId}`);
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }

  async getUsers(searchId: string, limit: number) {
    try {
      const data = await $clientHost.get<UserData[]>(`account/users`, {
        params: { searchId, limit }
      });
      return data.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }
}

export default new UserAPI();
