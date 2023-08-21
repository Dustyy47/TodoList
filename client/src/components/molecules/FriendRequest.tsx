import { UserData } from '@/types';
import Button from '../atoms/Button';

export function FriendRequest({
  data,
  onAccept,
  onDecline,
  onClick
}: {
  data: UserData;
  onAccept: (data: UserData) => void;
  onDecline: (data: UserData) => void;
  onClick: (data: UserData) => void;
}) {
  const { id, fullname } = data;

  function handleClick() {
    onClick(data);
  }

  function handleAccept() {
    onAccept(data);
  }

  function handleDecline() {
    onDecline(data);
  }

  return (
    <div className='w-full p-5 flex justify-between bg-white-common rounded-common'>
      <div>
        <div className='flex flex-col'>
          <p className='mb-2 heading'>{fullname}</p>
          <p className='paragraph'>{id}</p>
        </div>
      </div>
      <div className='flex gap-2'>
        <div className='max-w-[9.25rem] w-full'>
          <Button onClick={handleAccept}>Принять</Button>
        </div>
        <div>
          <Button onClick={handleDecline}>Отклонить</Button>
        </div>
        <div>
          <Button onClick={handleClick}>Посмотреть</Button>
        </div>
      </div>
    </div>
  );
}
