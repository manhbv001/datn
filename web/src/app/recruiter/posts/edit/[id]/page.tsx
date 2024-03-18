import PostForm from '@/components/recruiter/post/PostForm';
import postServices from '@/services/post.service';
import topicServices from '@/services/topic.service';
import { Metadata } from 'next';

interface IEditPostProps {
  params: {
    id: number;
  };
}

export const generateMetadata = async (
  props: IEditPostProps,
): Promise<Metadata> => {
  const postId = +props.params.id;
  const { data } = await postServices.getPost(+postId);

  return {
    title: `Chỉnh sửa - ${data.title}`,
  };
};

async function EditPost(props: IEditPostProps) {
  const postId = +props.params.id;
  const { data } = await postServices.getPost(+postId);
  const { data: topics } = await topicServices.queryTopics();

  return (
    <div className="h-full">
      <PostForm topics={topics} data={data} />
    </div>
  );
}
export default EditPost;
