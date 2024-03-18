import FeaturedAuthorsList from '@/components/post/FeaturedAuthorsList';
import PostFilter from '@/components/post/PostFilter';
import PostListWrapper from '@/components/post/PostListWrapper';
import PostParams from '@/components/post/PostParams';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bài viết - Techomies',
  description: 'Theo dõi các bài viết mới nhất trên Techomies',
};

export interface IPostsProps {}
async function Posts() {
  return (
    <div className="pb-8">
      <PostFilter />
      <PostParams />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-6 gap-x-8">
          <div className="col-span-6 lg:col-span-4">
            <PostListWrapper />
          </div>
          <div className="col-span-6 mt-8 lg:mt-0 lg:col-span-2">
            <span className="font-semibold lg:text-right w-full block text-lg mb-2">
              Tác giả nổi bật
            </span>
            <div className="col-span-2">
              <FeaturedAuthorsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
