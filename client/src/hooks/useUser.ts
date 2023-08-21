import UserAPI from '@/http/UserAPI';
import { useAppDispatch, useAppSelector } from '@/store';
import { usersActions } from '@/store/slices/userSlice';
import { deleteCookie } from 'cookies-next';
import { useParams, useRouter } from 'next/navigation';

export interface UpdateAccountForm {
  fullname: string;
}

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { user, loadingUser } = useAppSelector((state) => state.user);
  const router = useRouter();
  const params = useParams();

  function exit() {
    deleteCookie('auth');
    dispatch(usersActions.exit());
    router.push('/auth/login');
  }

  async function deleteAccount() {
    await UserAPI.deleteAccount();
    exit();
  }

  async function updateAccount(data: UpdateAccountForm) {
    await dispatch(usersActions.updateAccount(data));
  }

  const isMe = params.id === user?.id;

  return {
    isAuth: !!user,
    user,
    isMe,
    loadingUser,
    exit,
    deleteAccount,
    updateAccount
  };
};
