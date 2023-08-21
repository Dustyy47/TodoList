'use client';

import { usePathname } from 'next/navigation';
import { NavLink, NavLinkInfo } from '../atoms/NavLink';

export type NavbarLink = Omit<NavLinkInfo, 'isActive'>;

export function Navbar({ navLinks }: { navLinks: NavbarLink[] }) {
  const pathname = usePathname();

  return (
    <div className='flex'>
      {navLinks.map((navLink, index) => (
        <div key={index} className='mr-5 last:mr-0'>
          <NavLink info={{ ...navLink, isActive: pathname === navLink.link }} />
        </div>
      ))}
    </div>
  );
}
