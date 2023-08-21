import UserAPI from '@/http/UserAPI';
import { useAppDispatch } from '@/store';
import { usersActions } from '@/store/slices/userSlice';
import { SignInFormFields, SignUpFormFields } from '@/types';
import { AuthTokenDecoded, SignInDTO, SignUpDTO } from '@/types/User';
import { setCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useAuthorize() {
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function auth(dto: SignInDTO | SignUpDTO, mode: 'signIn' | 'signUp') {
    try {
      let res;
      if (mode === 'signIn') {
        res = await UserAPI.signIn(dto as SignInDTO);
      } else {
        res = await UserAPI.signUp(dto as SignUpDTO);
      }
      const { token } = res!;
      setCookie('auth', token, { sameSite: true });
      const decoded: AuthTokenDecoded = jwtDecode(token);
      dispatch(usersActions.fetchUser());
      router.push(`/profile/${decoded.id}`);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    }
  }

  const submitSignIn = useCallback((variants: SignInFormFields) => {
    auth(variants, 'signIn');
  }, []);

  const submitSignUp = useCallback((variants: SignUpFormFields) => {
    auth(variants, 'signUp');
  }, []);

  return { submitSignIn, submitSignUp, error };
}
