'use client';
import { HEADER_MENU } from '@/app/(feature)/data';
import fonts from '@/assets/fonts';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { HeaderMenuItemProps } from '@/models/common';
import { occupationService } from '@/services/occupation.service';
import { provinceService } from '@/services/province.service';
import { Drawer } from 'antd';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';

export interface INavigatorProps {}
export const Navigator: FC<INavigatorProps> = () => {
  const { user } = useContext(AuthContext);
  const [topJobsByOccupation, setTopJobsByOccupation] = useState<
    HeaderMenuItemProps[]
  >([]);
  const [topJobsByProvince, setTopJobsByProvince] = useState<
    HeaderMenuItemProps[]
  >([]);
  const activeSegment = useSelectedLayoutSegment();

  useEffect(() => {
    occupationService.getByJobsClient(2).then((response) => {
      if (response.success) {
        setTopJobsByOccupation(
          response.data.map((item) => ({
            label: `Việc làm ${item.name}`,
            path: `/jobs?occupation_id=${item.id}&headline=Việc làm ${item.name}`,
            target: 'jobs',
          })),
        );
      }
    });
    provinceService.getByJobsClient(2).then((response) => {
      if (response.success) {
        setTopJobsByProvince(
          response.data.map((item) => ({
            label: `Việc làm ${item.name}`,
            path: `/jobs?province_id=${item.id}&headline=Việc làm ${item.name}`,
            target: 'jobs',
          })),
        );
      }
    });
  }, []);

  return (
    <ul className="hidden md:flex items-center">
      {HEADER_MENU.filter((item) => {
        if (item.userType) return item.userType === user?.type;
        return true;
      }).map((item) => {
        const isActive = activeSegment === item.target;
        let subItems: HeaderMenuItemProps[] | undefined = item.subItems;
        if (item.path === '/jobs')
          subItems = [
            ...topJobsByOccupation,
            ...topJobsByProvince,
            {
              label: 'Việc làm Lương cao',
              path: '/jobs?order_key=salary_to&order_by=DESC&headline=Việc làm lương cao',
              target: 'jobs',
            },
          ];
        return (
          <li
            key={`header_item_${item.path}`}
            className="mx-4 group relative z-30"
          >
            <Link
              className={
                fonts.raleway.className +
                ` font-semibold hover:text-[var(--primary-color)] ${
                  isActive ? 'text-[var(--primary-color)] drop-shadow-sm' : ''
                } transition-all flex items-center`
              }
              href={item.path}
            >
              {item.label}
              {subItems && (
                <FaChevronDown size={12} style={{ marginLeft: 8 }} />
              )}
            </Link>
            <div className="absolute w-full h-[32px] block"></div>
            {subItems && (
              <ul className="bg-white border rounded overflow-hidden absolute z-50 invisible group-hover:visible top-10 w-[220px] -left-2 pt-1">
                {subItems.map((subItem) => (
                  <li key={subItem.target}>
                    <Link
                      className="py-2 px-3 block border-b hover:text-[var(--primary-color)]"
                      href={subItem.path}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export const MobileNavigator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const activeSegment = useSelectedLayoutSegment();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={showDrawer}
        className="inline-block md:hidden mr-4 opacity-50"
      >
        <AiOutlineMenu size={24} />
      </button>
      <Drawer
        bodyStyle={{ padding: 0 }}
        placement="left"
        onClose={onClose}
        open={open}
      >
        <ul className="flex flex-col">
          {HEADER_MENU.map((item) => {
            const isActive = activeSegment === item.target;
            return (
              <li key={`header_item_${item.path}`} className="mx-4">
                <Link
                  className={`block py-3 px-1 border-b font-semibold hover:text-[var(--primary-color)] ${
                    isActive ? 'text-[var(--primary-color)] drop-shadow-sm' : ''
                  } transition-all`}
                  href={item.path}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Drawer>
    </>
  );
};
