'use client';
import {
  ACCOUNT_MENU,
  APPLICANT_MENU,
  RECRUITER_MENU,
} from '@/app/(feature)/data';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { UserTypes } from '@/models/user';
import { Popover } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';
import { BsThreeDots } from 'react-icons/bs';

export interface IAccountMenuProps {}
const AccountMenu: FC<IAccountMenuProps> = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  let menu = [];

  if (user?.type === UserTypes.Applicant) menu = APPLICANT_MENU;
  else if (user?.type === UserTypes.Recruiter) menu = RECRUITER_MENU;
  else menu = ACCOUNT_MENU;

  const AccountMenu = (
    <ul>
      {menu.map((item) => (
        <li className="last:border-none" key={`account_menu_item_${item.path}`}>
          <Link
            className={`text-[var(--text-color)] py-2 px-2 min-w-[120px] block`}
            href={item.path}
            onClick={async (event) => {
              if (item.action) {
                event.preventDefault();
                await item.action();
                router.push(item.path);
              }
            }}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <Popover trigger="click" content={AccountMenu}>
      <div className="flex items-center h-full">
        <button>
          <BsThreeDots />
        </button>
      </div>
    </Popover>
  );
};

export default AccountMenu;
