'use client';

import { NavLink, NavLinkInfo } from '../atoms/NavLink';

export function StateNavbar({ navLinks }: { navLinks: NavLinkInfo[] }) {
  return (
    <div className='flex'>
      {navLinks.map((navLink, index) => (
        <div key={index} className='mr-5 last:mr-0'>
          <NavLink info={navLink} />
        </div>
      ))}
    </div>
  );
}
