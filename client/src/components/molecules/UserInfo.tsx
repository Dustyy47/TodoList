import { UserData } from '@/types';

export function UserInfo({ data }: { data: UserData }) {
  const { fullname, id } = data;
  return (
    <div className='flex flex-col items-end'>
      <p className='mb-2 heading'>{fullname}</p>
      <p className='paragraph'>@{id}</p>
    </div>
  );
}
