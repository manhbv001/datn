import CommonButton from '@/components/common/CommonButton';
import AuthorInfo from '@/components/profile/AuthorInfo';
import FollowBtn from '@/components/profile/FollowBtn';
import ProfileMenu from '@/components/profile/ProfileMenu';
import userServices from '@/services/user.service';
import { Metadata } from 'next';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FiAward } from 'react-icons/fi';
import './profile.css';

interface IProfileProps extends PropsWithChildren {
  params: {
    username: string;
  };
}

export async function generateMetadata(
  props: IProfileProps,
): Promise<Metadata> {
  const username = props.params.username;
  const { data: author } = await userServices.getUserProfile(username);

  return {
    title: `${author.fullname} - Techomies`,
    description: `Khám phá các bài viết mới nhất của tác giả ${author.fullname}`,
  };
}

const ProfileLayout = async (props: IProfileProps) => {
  const username = props.params.username;
  const { data: author } = await userServices.getUserProfile(username);

  return (
    <div>
      <div className="border-b py-8 relative">
        <Image
          src="/profile-default-banner.png"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-[100px] h-[100px] border rounded-full overflow-hidden relative">
              <Image fill alt="" src={author.avatar_url} />
            </div>
            <div className="flex flex-col ml-8">
              <span className="inline-flex items-center font-semibold text-lg">
                {author.fullname}{' '}
                <span className="inline-flex items-center font-normal text-xs px-2 py-1 border border-gray-700 ml-4 rounded-md gold-badge">
                  <FiAward style={{ marginRight: 4, color: 'silver' }} />
                  Senior member
                </span>
              </span>
              <span className="opacity-60">@{author.username}</span>
            </div>
            <div className="hidden md:block ml-auto shadow-md">
              <FollowBtn authorId={author.id} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-7 gap-x-10">
          <div className="col-span-7 md:col-span-2">
            <div className="block md:hidden shadow-md mb-2">
              <CommonButton
                type="primary"
                style={{
                  fontSize: 18,
                  paddingLeft: 18,
                  paddingRight: 18,
                  width: '100%',
                }}
              >
                <BiPlus style={{}} />
                Follow
              </CommonButton>
            </div>
            <AuthorInfo
              like_count={author.like_count}
              post_count={author.post_count}
              view_count={author.view_count}
              follower_count={author.follower_count}
              followings_count={author.followings_count}
            />
          </div>
          <div className="col-span-7 mt-8 md:mt-0 md:col-span-5">
            <div className="mx-w-[100vw]">
              <div className="block overflow-y-auto no-scrollbar md:flex justify-between">
                <ProfileMenu />
              </div>
            </div>
            <div className="mt-8">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
