import { TopicModel } from '@/models/topic';
import Link from 'next/link';
import { FC } from 'react';

export interface IPostTopicProps {
  data: TopicModel;
}
const PostTopic: FC<IPostTopicProps> = ({ data }) => {
  return (
    <Link
      href={`/posts?topic_ids=${data.id}`}
      className="cursor-pointer border hover:text-[vxwar(--active-color)] hover:border-[var(--active-color)] transition-all bg-gray-100 rounded-md text-xs px-2 py-1"
    >
      # {data.name}
    </Link>
  );
};

export default PostTopic;
