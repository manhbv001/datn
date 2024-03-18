'use client';
import { PostModel } from '@/models/post';
import { Divider } from 'antd';
import { FC } from 'react';
import RelavantPostItem from '../common/RelavantPostItem';

export interface IPostDetailRelavantsProps {
  data: PostModel[];
}
const PostDetailRelavants: FC<IPostDetailRelavantsProps> = ({ data }) => {
  return (
    <div className="mt-8 pb-8">
      <Divider orientation="center" style={{ fontSize: 16 }} plain>
        Bài viết liên quan
      </Divider>
      <ul className="grid grid-cols-3 gap-x-4">
        {data.map((post) => (
          <li key={`related_post_${post.id}`} className="col-span-1">
            <RelavantPostItem data={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailRelavants;
