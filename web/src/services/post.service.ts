import fetcher from '@/libs/fetcher';
import {
  CreatePostParams,
  IComment,
  IReactStatus,
  PostActionTypes,
  PostModel,
  QueryPostsParams,
} from '@/models/post';
import { toQueryParams } from '@/utils/queryParams';

const postServices = {
  queryPosts(params: QueryPostsParams) {
    const query = toQueryParams(params);
    return fetcher.clientReq<{ posts: PostModel[]; total: number }>(
      `posts${query}`,
    );
  },
  getPostBySlug(slug: string) {
    return fetcher.serverReq<{ post: PostModel; relavants: PostModel[] }>(
      `posts/${slug}`,
      {
        next: {
          revalidate: 0,
        },
      },
    );
  },
  getHomePosts() {
    return fetcher.serverReq<{ posts: PostModel[]; total: number }>(`posts`);
  },
  getFeaturedPosts() {
    return fetcher.serverReq<{ posts: PostModel[]; total: number }>(
      `posts?order_key=views&order_by=DESC`,
    );
  },
  getAuthorPosts(authorId: number, page = 1, size = 5) {
    return fetcher.serverReq<{ posts: PostModel[]; total: number }>(
      `posts?author_id=${authorId}&page=${page}&size=${size}&order_key=views&order_by=DESC`,
    );
  },
  reactPost(postId: number, payload: { type: PostActionTypes }) {
    return fetcher.clientReq(`posts/${postId}/react`, {
      body: JSON.stringify(payload),
      method: 'PATCH',
    });
  },
  viewPost(postId: number) {
    return fetcher.clientReq(`posts/view/${postId}`);
  },
  getReactStatus(postId: number) {
    return fetcher.clientReq<IReactStatus>(`posts/react-status/${postId}`);
  },
  comment(postId: number, content: string) {
    return fetcher.clientReq<IComment>(`posts/${postId}/comment`, {
      body: JSON.stringify({
        content,
      }),
      method: 'POST',
    });
  },
  createPost(params: CreatePostParams) {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('content', params.content);
    formData.append('status', params.status.toString());
    formData.append('description', params.description || '');
    params.thumbnail && formData.append('thumbnail', params.thumbnail);
    params.topic_ids.forEach((item) => {
      formData.append('topic_ids[]', item as unknown as string);
    });

    return fetcher.clientReq(`admin/posts`, {
      method: 'POST',
      body: formData,
      headers: undefined,
    });
  },

  getPost(id: number) {
    return fetcher.serverReq<PostModel>(`posts/detail/${id}`, {
      cache: 'no-store',
    });
  },

  editPost(id: number, params: CreatePostParams) {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('content', params.content);
    formData.append('status', params.status.toString());
    formData.append('description', params.description || '');
    params.thumbnail && formData.append('thumbnail', params.thumbnail);
    params.topic_ids.forEach((item) => {
      formData.append('topic_ids[]', item as unknown as string);
    });

    return fetcher.clientReq(`admin/posts/${id}`, {
      method: 'put',
      body: formData,
      headers: undefined,
    });
  },

  deletePost(id: number) {
    return fetcher.clientReq(`admin/posts/${id}`, {
      method: 'delete',
    });
  },

  updateState(id: number, state: boolean) {
    return fetcher.clientReq(`jobs/${id}/state`, {
      method: 'PATCH',
      body: JSON.stringify({ state }),
    });
  },
};

export default postServices;
