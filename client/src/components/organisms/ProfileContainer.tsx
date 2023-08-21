import { getProfileLinks } from '@/const/navlinks';
import { Navbar } from '../molecules/Navbar';

export function ProfileContainer({
  isMe = true,
  isFriend = false,
  id,
  children
}: {
  isMe?: boolean;
  isFriend?: boolean;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className='w-full flex flex-col'>
      <div className='mt-14 mb-10 w-full flex justify-center'>
        <Navbar navLinks={getProfileLinks(id, isMe, isFriend)} />
      </div>
      {children}
    </div>
  );
}
