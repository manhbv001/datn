'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { BiUser } from 'react-icons/bi';
import CommonButton from '../common/CommonButton';
import Loading from '../common/Loading';
import AccountMenu from './AccountMenu';
import { MobileNavigator, Navigator } from './Navigator';

const Header = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="border-b shadow-md">
      <div className="container mx-auto py-2 flex items-center">
        <MobileNavigator />
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/techomies.png"
              width={60}
              height={60}
              alt="Techomies logo"
            />
          </Link>
          <span
            style={{ transform: 'translate(-16px, 0px)' }}
            className="ml-2 opacity-80"
          >
            <Image
              height={12}
              width={100}
              src="/techomies-text.png"
              alt="Techomies logo"
            />
          </span>
        </div>
        <div className="ml-auto">
          <Navigator />
        </div>
        <div className="ml-10 flex items-center">
          {/* <Search />
          <Link
            href={
              user
                ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/admin-auth`
                : `/sign-in?redirect=${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/admin-auth`
              // '/coming-soon'
            }
            // target="_blank"
            className="mr-4"
            prefetch={false}
          >
            <Tooltip title="Viết bài">
              <BiPencil size={20} />
            </Tooltip>
          </Link> */}
          {loading ? (
            <Loading />
          ) : user ? (
            <>
              <div className="hidden md:block">
                <Link href={`/profile/${user.username}/posts`}>
                  <Image
                    src={user.avatar_url || '/techomies.png'}
                    width={36}
                    height={36}
                    style={{
                      padding: 2,
                      border: '2px solid var(--primary-color)',
                      borderRadius: '50%',
                    }}
                    alt="Techomies logo"
                  />
                </Link>
              </div>
              <div className="ml-4">
                <AccountMenu />
              </div>
            </>
          ) : (
            <>
              <div className="md:hidden">
                <Link href="/sign-in">
                  <BiUser size={20} style={{ opacity: 0.8 }} />
                </Link>
              </div>
              <div className="hidden md:block">
                <CommonButton link="/sign-up">Đăng ký</CommonButton>
                <CommonButton link="/sign-in" type="regular">
                  Đăng nhập
                </CommonButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
