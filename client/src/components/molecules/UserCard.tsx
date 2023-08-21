import { UserData } from '@/types';
import Button from '../atoms/Button';

export function UserCard({
  data,
  onClick
}: {
  data: UserData;
  onClick: (user: UserData) => void;
}) {
  const { fullname, friendStatus, id } = data;

  function handleClick() {
    onClick(data);
  }

  return (
    <div className='w-full p-5 flex justify-between bg-white-common rounded-common'>
      <div>
        <div className='flex flex-col'>
          <p className='mb-2 heading'>{fullname}</p>
          <p className='paragraph'>{id}</p>
        </div>
        <div>{friendStatus === 'Friends' ? 'Друг' : ''}</div>
      </div>
      <div className='max-w-[9.25rem] w-full'>
        <Button onClick={handleClick}>Посмотреть</Button>
      </div>
    </div>
  );
}
