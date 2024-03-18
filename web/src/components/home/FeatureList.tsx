import { PostModel } from '@/models/post';
import { FC } from 'react';
import FeaturePostItem from '../common/FeaturePostItem';

export interface IFeatureListProps {
  data: PostModel[];
}
const FeatureList: FC<IFeatureListProps> = ({ data }) => {
  return (
    <div>
      <ul className="flex flex-col gap-y-4">
        {data.map((post) => (
          <li key={`featured_post_${post.id}`}>
            <FeaturePostItem data={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList;
