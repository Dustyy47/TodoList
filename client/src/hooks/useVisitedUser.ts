import { useAppDispatch, useAppSelector } from '@/store';
import { usersActions } from '@/store/slices';

export function useVisitedUser() {
  false;

  const visitedUser = useAppSelector((state) => state.user.visitedUser);
  const dispatch = useAppDispatch();

  async function fetchVisitedUser(id: string) {
    await dispatch(usersActions.fetchVisitedUser(id));
  }

  return { fetchVisitedUser, visitedUser };
}
