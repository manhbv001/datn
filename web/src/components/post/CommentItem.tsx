'use client';

import datetime from '@/libs/datetime';
import { IComment } from '@/models/post';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export interface ICommentItemProps {
  data: IComment;
}
const CommentItem: FC<ICommentItemProps> = ({ data }) => {
  return (
    <div className="flex">
      <div className="flex-shrink-0 border rounded-full overflow-hidden w-[58px] h-[58px] relative">
        <Image src={data.user?.avatar_url} alt="" fill />
      </div>
      <div className="ml-4">
        <Link
          href={`/profile/${data.user.username}/posts`}
          className="block font-semibold text-[var(--primary-color)]"
        >
          {data.user.fullname}{' '}
          <span className="font-normal inline-block ml-2 opacity-70 text-xs">
            {data.user.username && `@${data.user.username}`}
          </span>
        </Link>
        <span className="block mt-2 opacity-50 text-xs">
          {datetime.formattedDate(data.created_at!)}
        </span>
        <p className="mt-3 text-sm">{data.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
