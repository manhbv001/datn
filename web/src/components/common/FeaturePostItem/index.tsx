import { PostModel } from '@/models/post';
import { generateRandImg } from '@/utils/image.util';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import BookmarkCount from '../PostParams/BookmarkCount';
import CommentCount from '../PostParams/CommentCount';
import Options from '../PostParams/Options';
import ViewCount from '../PostParams/ViewCount';

export interface IFeaturePostItemProps {
  data: PostModel;
}
const FeaturePostItem: FC<IFeaturePostItemProps> = ({ data }) => {
  return (
    <div>
      <div className="flex">
        <div className="flex-grow aspect-[5/3] relative rounded-md overflow-hidden">
          <div
            className="p-3 absolute z-10 w-full inset-y-0 flex flex-col justify-end"
            style={{
              background:
                'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 0%, rgba(22,22,22,0.39821866246498594) 38%, rgba(17,17,17,0.2833727240896359) 60%, rgba(0,0,0,0) 100%)',
            }}
          >
            <Link
              className="text-white font-semibold hover:underline transition-all"
              href={`/posts/${data.slug}`}
            >
              {data.title}
            </Link>
          </div>
          <Image
            fill
            alt=""
            style={{
              objectFit: 'cover',
            }}
            src={data.seo?.thumbnail || generateRandImg(500, 300)}
          />
        </div>
        <div className="hidden md:flex w-[100px] pl-2 pt-2 flex-col">
          <Link
            title={data.author.fullname}
            href={`/profile/${data.author.username}/posts`}
          >
            <div className="rounded-full border overflow-hidden w-[36px] h-[36px] relative mb-4">
              <Image src={data.author.avatar_url} alt="" fill />
            </div>
          </Link>
          <ViewCount count={data.views} />
          <CommentCount count={data.comment_count} />
          <BookmarkCount count={data.bookmarks} />
          <div className="ml-[10px] mt-8">
            <Options postId={data.id} postSlug={data.slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturePostItem;
