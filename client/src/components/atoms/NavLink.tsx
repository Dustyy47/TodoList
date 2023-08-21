import clsx from 'clsx';
import Link from 'next/link';

export interface NavLinkInfo {
  name: string;
  link: string;
  isActive: boolean;
}

export function NavLink({ info }: { info: NavLinkInfo }) {
  const classname = clsx(
    'heading',
    info.isActive ? 'lineBelow' : 'font-medium text-gray-common'
  );

  return (
    <Link className={classname} href={info.link}>
      {info.name}
    </Link>
  );
}
