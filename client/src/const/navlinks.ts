import { NavLinkInfo } from '@/components/atoms/NavLink';

export const authLinks: Omit<NavLinkInfo, 'isActive'>[] = [
  {
    name: 'Регистрация',
    link: '/auth/signUp'
  },
  {
    name: 'Вход',
    link: '/auth/signIn'
  }
];

export const getProfileLinks = (
  id: string,
  isMe: boolean,
  isFriend: boolean
) => {
  const links = [
    {
      name: 'Профиль',
      link: `/profile/${id}`
    }
  ];
  if (isFriend || isMe)
    links.push({
      name: 'Списки',
      link: `/profile/${id}/lists`
    });
  if (isMe)
    links.push({
      name: 'Поиск',
      link: `/profile/${id}/friends`
    });
  return links;
};
