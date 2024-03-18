'use client';
import useQueryParams from '@/hooks/useQueryParams';
import { PostModel, QueryPostsParams } from '@/models/post';
import postServices from '@/services/post.service';
import { Alert } from 'antd';
import { FC, useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';
import PostList from '../common/PostList';

const PostListWrapper: FC = () => {
  const { queryParams } = useQueryParams<QueryPostsParams>();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [total, setTotal] = useState<undefined | number>();

  useEffect(() => {
    postServices
      .queryPosts({
        filter: queryParams.filter,
        topic_ids: queryParams.topic_ids,
        search: queryParams.search,
      })
      .then((response) => {
        setPosts(response.data.posts);
        setTotal(response.data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryParams]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {posts?.length === 0 ? (
            <div>
              <Alert type="warning" description="Không có dữ liệu" />
            </div>
          ) : (
            <PostList data={posts} />
          )}
          {total ? (
            <div className="mt-8 text-right">
              <Pagination totalPage={total} currentItem={1} />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default PostListWrapper;
