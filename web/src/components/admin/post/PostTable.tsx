'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import useQueryParams from '@/hooks/useQueryParams';
import { PostModel, QueryPostsParams } from '@/models/post';
import postServices from '@/services/post.service';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import PostAction from './PostAction';

interface ITableColumData {
  order: number;
  id: number;
  title: string;
  author_name: string;
  is_active: boolean;
}

const columns: ColumnsType<ITableColumData> = [
  {
    title: '#',
    width: 10,
    dataIndex: 'order',
    key: 'order',
    fixed: 'left',
  },
  {
    title: 'ID',
    width: 20,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tiêu đề',
    width: 80,
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Tác giả',
    width: 80,
    dataIndex: 'author_name',
    key: 'author_name',
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: (payload: ITableColumData) => {
      return (
        <PostAction postId={payload.id} defaultValue={payload.is_active} />
      );
    },
  },
];

const PostsTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryPostsParams>();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    postServices.queryPosts({}).then((response) => {
      if (response.success) setPosts(response.data.posts);
    });
  }, [queryParams, user]);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return posts.map((post, index) => {
      return {
        order: index + 1,
        id: post.id,
        title: post.title,
        author_name: post.author?.fullname || '',
        is_active: !!post.is_active,
      };
    });
  }, [posts]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 1620 }}
      sticky
    />
  );
};

export default PostsTable;
