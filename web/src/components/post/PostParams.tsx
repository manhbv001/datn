'use client';

import useQueryParams from '@/hooks/useQueryParams';
import { QueryPostsParams } from '@/models/post';
import { TopicModel } from '@/models/topic';
import topicServices from '@/services/topic.service';
import { FC, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

export interface IPostParamsProps {}
const PostParams: FC<IPostParamsProps> = () => {
  const { queryParams, setQueryParams } = useQueryParams<QueryPostsParams>();
  const [topics, setTopics] = useState<TopicModel[]>([]);

  const currentTopic = topics.find(
    (topic) => topic.id === Number(queryParams.topic_ids),
  );

  const removeParams = (key: keyof QueryPostsParams) => {
    const params = { ...queryParams };
    delete params[key];
    setQueryParams(params, true);
  };

  useEffect(() => {
    topicServices.queryTopics().then((response) => {
      if (response.success) setTopics(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto">
      {currentTopic && (
        <p className="px-3 flex items-center my-4 text-[var(--primary-color)] font-bold gap-1">
          <span className="mr-1">Chủ đề: </span>
          {currentTopic.name}
          <button
            onClick={() => removeParams('topic_ids')}
            className="mt-[2px]"
          >
            <AiOutlineClose size={14} />
          </button>
        </p>
      )}
      {queryParams.search && (
        <p className="px-3 flex items-center my-4 text-[var(--primary-color)] font-bold gap-1">
          <span className="mr-1">Tìm kiếm: </span>
          {queryParams.search}
          <button onClick={() => removeParams('search')} className="mt-[2px]">
            <AiOutlineClose size={14} />
          </button>
        </p>
      )}
    </div>
  );
};

export default PostParams;
