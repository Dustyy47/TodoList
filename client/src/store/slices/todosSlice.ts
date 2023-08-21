import { TodoData, TodoID } from '@/components/molecules/Todo';
import { TodoListData } from '@/components/molecules/TodoListCard';
import TodosAPI from '@/http/TodosAPI';
import { Status } from '@/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '..';

const getLists = createAsyncThunk('todos/getLists', async (id: string) => {
  try {
    const lists = await TodosAPI.getLists(id);
    return lists;
  } catch (e) {
    return [];
  }
});

const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (
    { userId, listId }: { userId: string; listId: number },
    { dispatch }
  ) => {
    try {
      dispatch(todosActions.setActiveList(listId));
      const lists = await TodosAPI.getTodos(userId, listId);
      return lists;
    } catch (e) {
      return [];
    }
  }
);

const updateTodo = createAsyncThunk<
  TodoData | undefined,
  {
    userId: string;
    todo: TodoData;
  },
  { state: RootState; dispatch: AppDispatch }
>('todos/updateTodo', async ({ userId, todo }, { getState, dispatch }) => {
  try {
    const activeListId = getState().todos.activeListId;
    dispatch(todosActions.setLoadingTodo(todo.id));
    if (!activeListId) return;
    const updatedTodo = await TodosAPI.updateTodo(userId, activeListId, todo);
    return updatedTodo;
  } catch (e) {
    return undefined;
  }
});

const deleteTodo = createAsyncThunk<
  TodoID | undefined,
  {
    userId: string;
    todoId: TodoID;
  },
  { state: RootState }
>('todos/deleteTodo', async ({ userId, todoId }, { getState }) => {
  try {
    const activeListId = getState().todos.activeListId;
    if (!activeListId) return;
    await TodosAPI.deleteTodo(userId, activeListId, todoId);
    return todoId;
  } catch (e) {
    return undefined;
  }
});

const deleteList = createAsyncThunk<
  number | undefined,
  {
    userId: string;
    listId: number;
  }
>('todos/deleteList', async ({ userId, listId }) => {
  try {
    await TodosAPI.deleteList(userId, listId);
    return listId;
  } catch (e) {
    return undefined;
  }
});

const createTodo = createAsyncThunk<
  TodoData | undefined,
  {
    userId: string;
    todo: TodoData;
  },
  { state: RootState; dispatch: AppDispatch }
>('todos/createTodo', async ({ userId, todo }, { getState }) => {
  try {
    const activeListId = getState().todos.activeListId;
    if (!activeListId) return;
    const newTodo = await TodosAPI.createTodo(userId, activeListId, todo);
    return newTodo;
  } catch (e) {
    return undefined;
  }
});

const createList = createAsyncThunk<
  TodoListData,
  {
    userId: string;
    title: string;
  }
>('todos/createList', async ({ userId, title }) => {
  try {
    const newList = await TodosAPI.createList(title, userId);
    return newList;
  } catch (e) {
    return undefined;
  }
});

interface UserState {
  lists: TodoListData[];
  todos: TodoData[];
  loadingLists: Status;
  loadingTodos: Status;
  loadingTodoId: number | null;
  activeListId: number | null;
  activeListTitle: string | null;
}

const initialState: UserState = {
  lists: [],
  todos: [],
  loadingLists: Status.pending,
  loadingTodos: Status.pending,
  loadingTodoId: null,
  activeListId: null,
  activeListTitle: null
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoadingTodo(state, action: PayloadAction<number>) {
      state.loadingTodoId = action.payload;
    },
    setActiveList(state, action) {
      state.activeListId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      //   .addCase(hydrate, (state, action) => {
      //     state.lists = action.payload.todos.lists;
      //     state.todos = action.payload.todos.todos;
      //   })
      .addCase(getLists.fulfilled, (state, action) => {
        state.lists = action.payload || null;
        state.loadingLists = Status.fulfiled;
      })
      .addCase(getLists.pending, (state) => {
        state.loadingLists = Status.pending;
      })
      .addCase(getLists.rejected, (state) => {
        state.loadingLists = Status.rejected;
      })

      .addCase(getTodos.fulfilled, (state, action) => {
        state.activeListTitle = action.payload.originalList.title;
        state.todos = action.payload.todos || null;
        state.loadingTodos = Status.fulfiled;
      })

      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos = [action.payload!, ...state.todos];
      })

      .addCase(deleteTodo.fulfilled, (state, action) => {
        const deletedTodoID = action.payload;
        if (!deletedTodoID) return;
        state.todos = state.todos.filter((todo) => todo.id !== deletedTodoID);
      })

      .addCase(updateTodo.fulfilled, (state, action) => {
        if (!action.payload) return;
        const updatedTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo.id === updatedTodo.id
        );

        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
        state.loadingTodoId = null;
      })
      .addCase(createList.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.lists.push(action.payload);
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.lists = state.lists.filter((list) => list.id !== action.payload);
      });
  }
});

export const todosActions = {
  createTodo,
  getLists,
  getTodos,
  updateTodo,
  deleteTodo,
  createList,
  deleteList,
  ...todosSlice.actions
};
export const todosReducer = todosSlice.reducer;
