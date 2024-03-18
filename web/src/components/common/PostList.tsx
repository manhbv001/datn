import { PostModel } from '@/models/post';
import { FC } from 'react';
import PostItem from './PostItem';

export interface IPostListProps {
  data: PostModel[];
}
const PostList: FC<IPostListProps> = ({ data }) => {
  return (
    <div>
      <ul>
        {data.map((post) => (
          <li key={`post_list_${post.id}`}>
            <PostItem data={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
