'use client';

import Button from '@/components/atoms/Button';
import { PlusIcon } from '@/components/icons/PlusIcon';
import { TodoData } from '@/components/molecules/Todo';
import { TodoList } from '@/components/organisms/TodoList';
import { useUser } from '@/hooks';
import { useTodos } from '@/hooks/useTodos';
import { Status } from '@/types';
import { useEffect, useState } from 'react';

export default function TodoPage({
  params
}: {
  params: { listId: string; id: string };
}) {
  const { listId, id } = params;
  const { isMe } = useUser();
  const [editTodos, setEditTodos] = useState<number[]>([]);

  const {
    todos,
    loadingTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    loadingTodoId,
    activeListTitle
  } = useTodos();

  useEffect(() => {
    getTodos(+listId, id);
  }, [listId]);

  async function handleCreateTodo() {
    const newTodo: TodoData = {
      isCompleted: false,
      id: Math.random() * 100000,
      title: '',
      text: ''
    };
    const res = await createTodo(newTodo);
    if (res?.payload) {
      const id = (res.payload as TodoData).id;
      setEditTodos((prev) => [...prev, id]);
    }
  }

  function handleStartEditTodo(todo: TodoData) {
    setEditTodos((prev) => [...prev, todo.id]);
  }

  function handleFinishEditTodo(todo: TodoData) {
    setEditTodos((prev) => prev.filter((id) => id !== todo.id));
    updateTodo(todo);
  }

  if (!todos || loadingTodos === Status.pending) return 'Loading...';

  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-[59.625rem]'>
        <div className='flex justify-between items-center mb-[3.3125rem] mt-[10rem]'>
          <h3 className='heading text-[3rem]'>{activeListTitle}</h3>
          <div className=' max-w-[11.125rem] w-full'>
            {isMe && (
              <Button onClick={handleCreateTodo}>
                <span className='mr-[.625rem]'>
                  <PlusIcon />
                </span>
                <span>Новое дело</span>
              </Button>
            )}
          </div>
        </div>

        <div>
          <TodoList
            loadingTodosIDs={[loadingTodoId ?? -1]}
            editTodos={editTodos}
            onStartEditTodo={handleStartEditTodo}
            onFinishEditTodo={handleFinishEditTodo}
            onDeleteTodo={deleteTodo}
            todos={todos}
            readonlyTodo={!isMe}
          />
        </div>
      </div>
    </div>
  );
}
