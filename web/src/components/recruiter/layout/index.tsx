'use client';

import { ADMIN_MENU } from '@/app/(feature)/data';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import type { MenuProps } from 'antd';
import { Layout, Menu, Popover, theme } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { BsPostcardHeartFill } from 'react-icons/bs';
import { HiMiniUsers } from 'react-icons/hi2';
import { IoBusiness } from 'react-icons/io5';
import { MdBusinessCenter } from 'react-icons/md';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Tổng quan', 'recruiter', <MdBusinessCenter />),
  getItem('Tuyển dụng', '0', <MdBusinessCenter />, [
    getItem('Danh sách Công việc', 'recruiter/jobs'),
    getItem('Tạo công việc', 'recruiter/jobs/create'),
  ]),
  getItem('Ứng viên', '0', <HiMiniUsers />, [
    getItem('Ứng viên đã ứng tuyển', 'recruiter/applicants'),
    getItem('Ứng viên đang tìm việc', 'recruiter/applicants/opens'),
  ]),
  getItem('Bài viết', '0', <BsPostcardHeartFill />, [
    getItem('Danh sách bài viết', 'recruiter/posts'),
    getItem('Viết bài', 'recruiter/posts/create'),
  ]),
  getItem('Doanh nghiệp', 'recruiter/profile', <IoBusiness />),
];

interface IRecruiterLayoutProps extends PropsWithChildren {}

const AccountMenu = (
  <ul className="p-0 m-0 list-none">
    {ADMIN_MENU.map((item) => (
      <li key={`account_menu_item_${item.path}`}>
        <Link
          className={`text-[var(--text-color)] py-2 px-2 min-w-[120px] block border-b ${
            item.isLgout ? 'border-none' : ''
          }`}
          href={item.path}
        >
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
);

const RecruiterLayout: React.FC<IRecruiterLayoutProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const selectedSegments = useSelectedLayoutSegments();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const selectedKeys = selectedSegments.length
    ? selectedSegments.join('/')
    : '/';

  const handleMenuItemSelect = (info: any) => {
    info.key && router.push(`/${info.key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
      >
        <div className="text-xl p-2">
          <Image
            src="/recruit-logo.jpg"
            alt="Recruit logo"
            width={120}
            height={50}
          />
        </div>
        <div className="border-t mt-[1px]">
          <Menu
            openKeys={['0']}
            selectedKeys={[`recruiter/${selectedKeys}`]}
            mode="inline"
            items={items}
            onSelect={handleMenuItemSelect}
            expandIcon={' '}
          />
        </div>
      </Sider>
      <Layout style={{ height: '100vh' }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-end items-center h-full px-[16px]">
            <div className="mr-2 mt-1 text-right">
              <span
                className="font-semibold block"
                style={{ lineHeight: '1.3rem' }}
              >
                {user?.fullname}
              </span>
              <span
                className="uppercase opacity-70 block"
                style={{ lineHeight: '1.3rem' }}
              >
                {user?.enterprise?.name}
              </span>
            </div>
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden cursor-pointer">
              <Popover trigger="click" content={AccountMenu}>
                <Image
                  src={user?.avatar_url || '/user.png'}
                  alt=""
                  width={45}
                  height={45}
                />
              </Popover>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '16px', flexGrow: 1 }}>
          <div
            style={{
              padding: 24,
              height: '100%',
              overflow: 'auto',
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RecruiterLayout;
