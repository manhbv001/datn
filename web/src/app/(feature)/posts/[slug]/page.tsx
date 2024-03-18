import CommentList from '@/components/post/CommentList';
import InvokeViewPost from '@/components/post/InvokeViewPost';
import PostDetailAction from '@/components/post/PostDetailActions';
import PostDetailAuthor from '@/components/post/PostDetailAuthor';
import PostDetailRelavants from '@/components/post/PostDetailRelavants';
import PostTopic from '@/components/post/PostTopic';
import postServices from '@/services/post.service';
import userServices from '@/services/user.service';
import { generateRandImg } from '@/utils/image.util';
import { Metadata } from 'next';
import './post-detail.css';

export interface IPostDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  props: IPostDetailProps,
): Promise<Metadata> {
  const slug = props.params.slug;
  const {
    data: { post },
  } = await postServices.getPostBySlug(slug);
  return {
    title: post.title,
    openGraph: {
      images: [post.seo?.thumbnail || generateRandImg(400, 300)],
      title: post.title,
      description: post.seo?.description,
      url: `${process.env.DOMAIN}/posts/${slug}`,
      type: 'article',
    },
    description: post.seo?.description,
    applicationName: 'Techomies',
    authors: {
      url: `${process.env.DOMAIN}/profile/${post.author.username}/posts`,
      name: post.author.fullname,
    },
    other: {
      'fb:app_id': process.env.FACEBOOK_CLIENT_ID as string,
    },
  };
}

export default async function PostDetail(props: IPostDetailProps) {
  const slug = props.params.slug;

  const {
    data: { post: postData, relavants },
  } = await postServices.getPostBySlug(slug);
  const { data: author } = await userServices.getUserProfile(
    postData.author.username,
  );
  const {
    data: { posts: authorPosts },
  } = await postServices.getAuthorPosts(author.id);

  return (
    <div className="container mx-auto">
      <InvokeViewPost postId={postData.id} />
      <div className="post-detail-data-wrapper flex flex-wrap lg:flex-nowrap lg:relative overflow-auto py-8 no-scrollbar">
        <div className="flex items-center border-t bg-white fixed bottom-0 left-0 right-0 top-[unset] h-[50px] z-20 bg-red w-full lg:block lg:border-t-0 lg:w-[120px] lg:bg-[unset] lg:sticky lg:bottom-[unset] lg:h-[unset] lg:z-[unset] lg:top-[-50px] lg:left-[unset] lg:right-[unset]">
          <div className="container mx-auto">
            <PostDetailAction data={postData} />
          </div>
        </div>
        <div className="flex-grow mx-0 lg:mx-10">
          <PostDetailAuthor isMobile data={author} posts={authorPosts} />
          <h1 className="font-bold" style={{ fontSize: 30 }}>
            {postData.title}
          </h1>
          <div>
            <ul className="my-2 inline-flex gap-1">
              {' '}
              {postData.topics.map((topic) => (
                <li key={`detail_post_topic_${topic.id}`}>
                  <PostTopic data={topic} />
                </li>
              ))}
            </ul>
          </div>
          <div className="ck-post-content mt-8 leading-9 min-h-full">
            <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
          </div>

          <PostDetailRelavants data={relavants} />
          <div className="pb-10">
            <span className="font-semibold text-lg">Bình luận:</span>
            <div className="my-8">
              <CommentList
                postId={postData.id}
                initialComments={postData.comments}
              />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-full lg:w-[320px] lg:sticky top-[-20px]">
          <PostDetailAuthor data={author} posts={authorPosts} />
        </div>
      </div>
    </div>
  );
}
