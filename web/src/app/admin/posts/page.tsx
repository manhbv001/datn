import PostsTable from '@/components/admin/post/PostTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý bài viết - Techomies',
};

const PostList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <PostsTable />
    </main>
  );
};

export default PostList;
