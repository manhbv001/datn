import PostTopic from '@/components/post/PostTopic';
import { PostModel } from '@/models/post';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import BookmarkCount from '../PostParams/BookmarkCount';
import CommentCount from '../PostParams/CommentCount';
import CopyUrl from '../PostParams/CopyUrl';
import Options from '../PostParams/Options';
import ViewCount from '../PostParams/ViewCount';

export interface IPostItemProps {
  data: PostModel;
}
const PostItem: FC<IPostItemProps> = ({ data }) => {
  return (
    <div className="px-1 py-3 pb-8 pr-4 border-b">
      <div className="flex">
        <div className="flex-shrink-0 w-[56px] h-[56px] border rounded-full overflow-hidden relative">
          <Image src={data.author.avatar_url} alt="logo" fill />
        </div>
        <div className="px-3">
          <div>
            <Link
              className="inline-block text-sm mr-2 text-[var(--primary-color)] font-semibold"
              href={`/profile/${data.author.username}/posts`}
            >
              {data.author.fullname}
            </Link>
            <span className="text-xs text-gray-500">Hôm qua, 21:24</span>
          </div>
          <Link
            className="hover:text-[var(--active-color)] transition-all block"
            href={`/posts/${data.slug}`}
          >
            {data.title}
          </Link>
          <ul className="my-2 inline-flex gap-1">
            {data.topics.map((topic) => (
              <li key={`post_item_topic_${topic.id}`}>
                <PostTopic data={topic} />
              </li>
            ))}
          </ul>
          <div className="mt-1 text-sm flex">
            <div className="inline-flex gap-x-3">
              <ViewCount count={data.views} />
              <BookmarkCount count={data.bookmarks} />
              <CommentCount count={data.comment_count} />
              <CopyUrl url="abc" />
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <Options postId={data.id} postSlug={data.slug} />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
