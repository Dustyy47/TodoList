import { UpdateAccountForm } from '@/hooks';
import UserAPI from '@/http/UserAPI';
import { Status, UserData } from '@/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchUser = createAsyncThunk('users/getMe', async () => {
  const user = await UserAPI.getMe();
  return user;
});

const updateAccount = createAsyncThunk<UserData | undefined, UpdateAccountForm>(
  'users/updateAccount',
  async (data) => {
    try {
      const newUser = await UserAPI.updateAccount(data);
      if (!newUser) return undefined;
      return newUser;
    } catch (e) {
      return undefined;
    }
  }
);

const fetchVisitedUser = createAsyncThunk(
  'users/getVisitedUser',
  async (visitedUserId: string) => {
    try {
      const user = await UserAPI.getUser(visitedUserId);
      return user;
    } catch (e) {
      return undefined;
    }
  }
);

interface UserState {
  user: UserData | null;
  loadingUser: Status;
  visitedUser: UserData | null;
  loadingVisitedUser: Status;
}

const initialState: UserState = {
  user: null,
  loadingUser: Status.pending,
  visitedUser: null,
  loadingVisitedUser: Status.pending
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    exit(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload || null;
        state.loadingUser = Status.fulfiled;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loadingUser = Status.pending;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loadingUser = Status.rejected;
      })

      .addCase(fetchVisitedUser.fulfilled, (state, action) => {
        state.visitedUser = action.payload || null;
        state.loadingVisitedUser = Status.fulfiled;
      })
      .addCase(fetchVisitedUser.pending, (state) => {
        state.loadingVisitedUser = Status.pending;
      })
      .addCase(fetchVisitedUser.rejected, (state) => {
        state.loadingVisitedUser = Status.rejected;
      })
      .addCase(updateAccount.pending, (state) => {
        state.loadingUser = Status.pending;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.user = action.payload;
      });
  }
});

export const usersActions = {
  fetchUser,
  fetchVisitedUser,
  updateAccount,
  ...userSlice.actions
};
export const usersReducer = userSlice.reducer;
