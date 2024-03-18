import PostTable from '@/components/recruiter/post/PostTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý nội dung - Techomies',
};

const PostList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <PostTable />
    </main>
  );
};

export default PostList;
