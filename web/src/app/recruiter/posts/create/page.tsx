import PostForm from '@/components/recruiter/post/PostForm';
import topicServices from '@/services/topic.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo bài viết',
};

async function CreatePost() {
  const { data: topics } = await topicServices.queryTopics();

  return (
    <div className="h-full">
      <PostForm topics={topics} />
    </div>
  );
}

export default CreatePost;
