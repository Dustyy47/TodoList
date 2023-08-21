'use client';
import Button from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { ProfileContainer } from '@/components/organisms/ProfileContainer';
import { useFriends } from '@/hooks/useFriends';
import { useUser } from '@/hooks/useUser';
import { useVisitedUser } from '@/hooks/useVisitedUser';
import { FriendRequestStatus } from '@/types';
import { useRef, useState } from 'react';

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { isMe, exit, deleteAccount, updateAccount, user } = useUser();
  const { visitedUser, fetchVisitedUser } = useVisitedUser();
  const { sendRequest, updateRequest } = useFriends();
  const [isEditing, setEditing] = useState(false);
  const editingInput = useRef<HTMLInputElement>(null);

  function handleExit() {
    exit();
  }

  function handleDeleteProfile() {
    deleteAccount();
  }

  async function handleSendFriendRequest() {
    await sendRequest(id);
    fetchVisitedUser(id);
  }

  async function handleUpdateFriendRequest(status: FriendRequestStatus) {
    await updateRequest(id, status);
    fetchVisitedUser(id);
  }

  function handleToggleEditing() {
    if (isEditing) {
      setEditing(false);
      if (editingInput.current && editingInput.current.value) {
        updateAccount({ fullname: editingInput.current.value });
        fetchVisitedUser(id);
      }
    } else {
      setEditing(true);
    }
  }

  if (!visitedUser) return 'Loading';

  function renderProfileButtons() {
    if (isMe) {
      return (
        <div>
          {isEditing && (
            <div className='bg-white-common p-5 mb-5'>
              {<Input ref={editingInput} label='ФИО' />}
            </div>
          )}
          <div className='mb-3'>
            <Button onClick={handleToggleEditing}>
              {isEditing ? 'Подтвердить' : 'Редактировать'}
            </Button>
          </div>
          <div className='mb-3'>
            <Button onClick={handleExit}>Выйти</Button>
          </div>
          <Button onClick={handleDeleteProfile}>Удалить аккаунт</Button>
        </div>
      );
    } else {
      let buttonText;
      let onClickCallback;
      if (visitedUser?.friendStatus === 'ActiveUserSubscribed') {
        buttonText = 'Отписаться';
        onClickCallback = () => handleUpdateFriendRequest('DECLINED');
      } else if (visitedUser?.friendStatus === 'TargetUserSubscribed') {
        buttonText = 'Принять запрос';
        onClickCallback = () => handleUpdateFriendRequest('ACCEPTED');
      } else if (visitedUser?.friendStatus === 'Friends') {
        buttonText = 'Удалить из друзей';
        onClickCallback = () => handleUpdateFriendRequest('DECLINED');
      } else {
        buttonText = 'Подписаться';
        onClickCallback = handleSendFriendRequest;
      }
      return (
        <div>
          <Button onClick={onClickCallback}>{buttonText}</Button>
        </div>
      );
    }
  }

  return (
    <ProfileContainer
      id={id}
      isMe={isMe}
      isFriend={visitedUser.friendStatus === 'Friends'}
    >
      <div className='flex w-full justify-center'>
        <div className='flex flex-col max-w-[30rem] w-full '>
          <h3 className='heading'>
            {isMe ? user?.fullname : visitedUser.fullname}
          </h3>
          <span className='paragraph text-gray-placeholder mb-7'>
            @{visitedUser.id}
          </span>
          {renderProfileButtons()}
        </div>
      </div>
    </ProfileContainer>
  );
}
