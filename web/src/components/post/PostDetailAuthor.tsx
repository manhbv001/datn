'use client';
import { PostModel } from '@/models/post';
import { UserModel } from '@/models/user';
import userServices from '@/services/user.service';
import { Divider } from 'antd';
import { FC, useEffect, useState } from 'react';
import AuthorItem from '../common/AuthorItem';
import AuthorPostItem from './AuthorPostItem';

export interface IPostDetailAuthorProps {
  data: UserModel;
  posts: PostModel[];
  isMobile?: boolean;
}
const PostDetailAuthor: FC<IPostDetailAuthorProps> = ({
  data,
  posts,
  isMobile,
}) => {
  const [followed, setFollowed] = useState<string | boolean>('pending');

  useEffect(() => {
    userServices.followStatus(data.id).then((response) => {
      if (response.success) setFollowed(response.data.followed);
    });
  }, [data]);

  return (
    <div>
      {typeof followed === 'boolean' && (
        <div
          className={
            isMobile
              ? 'block md:hiden lg:hidden xl:hidden 2xl:hidden mb-10'
              : 'hidden md:block lg:block xl:block 2xl:block'
          }
        >
          <AuthorItem data={{ ...data, followed: Number(followed) }} />
        </div>
      )}
      {!isMobile && (
        <>
          <Divider orientation="left" plain>
            Bài viết khác của tác giả
          </Divider>
          <ul className="flex flex-col gap-4 pl-2">
            {posts.map((post) => (
              <li key={`author_post_${post.id}`}>
                <AuthorPostItem data={post} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PostDetailAuthor;
