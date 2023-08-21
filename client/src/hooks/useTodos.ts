'use client';
import { TodoData, TodoID } from '@/components/molecules/Todo';
import { useAppDispatch, useAppSelector } from '@/store';
import { todosActions } from '@/store/slices';
import { useUser } from './useUser';

export function useTodos() {
  const { user } = useUser();
  const { todos, loadingTodos, loadingTodoId, activeListTitle } =
    useAppSelector((state) => state.todos);
  const lists = useAppSelector((state) => state.todos.lists);
  const dispatch = useAppDispatch();

  function createList(title: string) {
    if (!user) return;
    dispatch(todosActions.createList({ userId: user?.id, title }));
  }

  function updateTodo(todo: TodoData) {
    if (!user) return;
    dispatch(todosActions.updateTodo({ userId: user?.id, todo }));
  }

  async function createTodo(todo: TodoData) {
    if (!user) return;
    return await dispatch(todosActions.createTodo({ userId: user?.id, todo }));
  }

  function deleteTodo(todoId: TodoID) {
    if (!user) return;
    dispatch(todosActions.deleteTodo({ userId: user?.id, todoId }));
  }

  function deleteList(listId: number) {
    if (!user) return;
    dispatch(todosActions.deleteList({ userId: user?.id, listId }));
  }

  function getTodos(listId: number, userId: string) {
    dispatch(todosActions.getTodos({ userId, listId }));
  }
  return {
    todos,
    lists,
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    createList,
    deleteList,
    loadingTodos,
    loadingTodoId,
    activeListTitle
  };
}
