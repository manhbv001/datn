'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { UserModel } from '@/models/user';
import userServices from '@/services/user.service';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext, useState } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { FaPenAlt, FaUserPlus } from 'react-icons/fa';
import { FiUserCheck } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';

export interface IAuthorItemProps {
  data: UserModel;
}
const AuthorItem: FC<IAuthorItemProps> = ({ data }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [followed, setFollowed] = useState(Boolean(+data.followed));

  const follow = () => {
    if (!user)
      return router.replace(`/sign-in?redirect=${window.location.href}`);
    userServices.follow({ author_id: data.id }).then((response) => {
      if (response.success) setFollowed(!followed);
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-[80px] h-[80px] border rounded-full overflow-hidden relative">
        <Image src={data.avatar_url} fill alt="author" />
      </div>
      <div className="ml-4">
        <Link
          href={`/profile/${data.username}/posts`}
          className="font-semibold text-[var(--active-color)]"
        >
          {data.fullname}
        </Link>
        <div className="flex gap-x-3 mt-1">
          <span className="inline-flex items-center opacity-50">
            <AiTwotoneStar />
            <span className="inline-block ml-1 text-sm">12</span>
          </span>
          <span className="inline-flex items-center opacity-50">
            <FaPenAlt size={13} />
            <span className="inline-block ml-1 text-sm">{data.post_count}</span>
          </span>
          <span className="inline-flex items-center opacity-50">
            <FaUserPlus />
            <span className="inline-block ml-1 text-sm">
              {data.follower_count}
            </span>
          </span>
        </div>
      </div>
      {user?.id !== data.id && (
        <button
          className="flex items-center opacity-50 ml-auto activable"
          style={{ transform: 'translateY(-12px)', fontSize: 15 }}
          onClick={follow}
        >
          {followed ? (
            <FiUserCheck
              size={20}
              style={{
                marginRight: 4,
                marginTop: 2,
                color: 'var(--primary-color)',
              }}
            />
          ) : (
            <>
              Theo dõi{' '}
              <HiOutlinePlus
                className="activable"
                style={{ marginLeft: 4, transform: 'translateY(-1px)' }}
                size={16}
              />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AuthorItem;
