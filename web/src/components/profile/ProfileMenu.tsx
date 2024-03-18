'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { PROFILE_MENU } from './data';

const ProfileMenu = () => {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <ul className="block md:flex gap-x-4 w-[610px] max-w-[unset]">
      {PROFILE_MENU.map((item) => {
        const isActive = item.path === activeSegment;
        return (
          <li
            key={item.key}
            className={`inline-block py-3 font-semibold active-menu-item-profile ${
              isActive ? 'active' : ''
            }`}
          >
            <Link href={item.path}>{item.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ProfileMenu;
