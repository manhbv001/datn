import { PostModel } from '@/models/post';
import Link from 'next/link';
import { FC } from 'react';
import BookmarkCount from '../common/PostParams/BookmarkCount';
import ViewCount from '../common/PostParams/ViewCount';

export interface IAuthorPostItemProps {
  data: PostModel;
}
const AuthorPostItem: FC<IAuthorPostItemProps> = ({ data }) => {
  return (
    <div>
      <Link
        className="hover:text-[var(--active-color)] transition-all block text-sm"
        href={`/posts/${data.slug}`}
      >
        {data.title}
      </Link>
      <div className="mt-1 text-sm flex">
        <div className="inline-flex gap-x-3">
          <ViewCount count={data.views} />
          <BookmarkCount count={data.bookmarks} />
        </div>
      </div>
    </div>
  );
};

export default AuthorPostItem;
