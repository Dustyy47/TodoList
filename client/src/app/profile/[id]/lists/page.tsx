'use client';

import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { TodoListCard } from '@/components/molecules/TodoListCard';
import { ProfileContainer } from '@/components/organisms/ProfileContainer';
import { useTodos, useUser, useVisitedUser } from '@/hooks';
import { useAppDispatch } from '@/store';
import { todosActions } from '@/store/slices';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function TodoListsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user, isMe } = useUser();
  const { lists, createList, deleteList } = useTodos();
  const { visitedUser } = useVisitedUser();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) dispatch(todosActions.getLists(id));
  }, [id]);

  function handleClickList(listId: number) {
    if (user?.id) {
      router.push(`/profile/${id}/lists/${listId}`);
    }
  }

  function handleCreateList() {
    if (inputRef.current?.value) createList(inputRef.current?.value!);
  }

  function handleDeleteList(listId: number) {
    deleteList(listId);
  }

  return (
    <ProfileContainer
      id={id}
      isMe={isMe}
      isFriend={visitedUser?.friendStatus === 'Friends'}
    >
      <div className='self-center max-w-[30rem] w-full'>
        {isMe && (
          <div className='bg-white-common p-5 rounded-common mb-5'>
            <div className='mb-5'>
              <Input ref={inputRef} label={'Название'} />
            </div>
            <div>
              <Button onClick={handleCreateList}>Добавить список</Button>
            </div>
          </div>
        )}

        <div>
          {lists.map((list) => (
            <div key={list.id} className='mb-2'>
              <TodoListCard
                readonly={!isMe}
                onDelete={handleDeleteList}
                onClick={handleClickList}
                data={list}
              />
            </div>
          ))}
        </div>
      </div>
    </ProfileContainer>
  );
}
