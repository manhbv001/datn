'use client';

import { PostModel } from '@/models/post';
import { TopicModel } from '@/models/topic';
import postServices from '@/services/post.service';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import PostAction from './PostAction';

interface ITableColumData {
  order: number;
  id: number;
  title: string;
  topics: TopicModel[];
  views: number;
  likes: number;
  bookmarks: number;
}

const columns: ColumnsType<ITableColumData> = [
  {
    title: '#',
    width: 30,
    dataIndex: 'order',
    key: 'order',
    fixed: 'left',
  },
  {
    title: 'ID',
    width: 80,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    width: 200,
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Topics',
    dataIndex: 'topics',
    key: 'topics',
    width: 200,
    render: (value) => {
      return value.map((topic: TopicModel) => (
        <Tag key={`post_table_topics_${topic.id}`}>{topic.name}</Tag>
      ));
    },
  },
  {
    title: 'Views',
    dataIndex: 'views',
    key: 'views',
    width: 50,
  },
  {
    title: 'Likes',
    dataIndex: 'likes',
    key: 'likes',
    width: 50,
  },
  {
    title: 'Bookmarks',
    dataIndex: 'bookmarks',
    key: 'bookmarks',
    width: 50,
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 60,
    render: (payload: ITableColumData) => {
      return <PostAction postId={payload.id} />;
    },
  },
];

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    postServices.queryPosts({}).then((response) => {
      if (response.success) setPosts(response.data.posts);
    });
  }, []);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return posts.map((post, index) => {
      return {
        order: index + 1,
        id: post.id,
        title: post.title,
        topics: post.topics,
        likes: post.likes,
        views: post.views,
        bookmarks: post.bookmarks,
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

export default PostTable;
