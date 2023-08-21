import {
  AnyAction,
  configureStore,
  createAction,
  ThunkMiddleware
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { todosReducer } from './slices';
import { usersReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: usersReducer,
    todos: todosReducer
  },
  devTools: true
});

//export const wrapper = createWrapper(() => store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction>]
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper(() => store);
export const hydrate = createAction<RootState>(HYDRATE);
