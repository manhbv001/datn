import { PostModel } from '@/models/post';
import { generateRandImg } from '@/utils/image.util';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export interface IRelavantPostItemProps {
  data: PostModel;
}
const RelavantPostItem: FC<IRelavantPostItemProps> = ({ data }) => {
  return (
    <div>
      <div>
        <div className="aspect-[5/3] relative rounded-md overflow-hidden">
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
      </div>
    </div>
  );
};

export default RelavantPostItem;
