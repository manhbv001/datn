import { BaseModel, BaseQueryParams } from './common';
import { TopicModel } from './topic';
import { UserModel } from './user';

export enum PostActionTypes {
  Like = 1,
  Dislike = 2,
  Bookmark = 3,
}

export enum PostStatuses {
  Public = 1,
  Draft = 2,
  Privated = 3,
  Restricted = 4,
}

export interface ISeo extends BaseModel {
  thumbnail: string;
  description: string;
}

export interface IPostAction extends BaseModel {
  type: PostActionTypes;
  post: PostModel;
  user: UserModel;
}

export interface PostModel extends BaseModel {
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: PostStatuses;
  author: UserModel;
  author_id: number;
  views: number;
  seo: ISeo;
  actions: IPostAction[];
  comments: IComment[];
  topics: TopicModel[];
  likes: number;
  comment_count: number;
  bookmarks: number;
  dislikes: number;
}

export interface IComment extends BaseModel {
  content: string;
  post_id: number;
  user_id: number;
  user: UserModel;
}

export interface IReactStatus {
  liked: number;
  disliked: number;
  bookmarked: number;
}

export enum PostFilters {
  Latest = 1,
  Following = 2,
  Trending = 3,
  Bookmarked = 4,
  Discuss = 5,
}

export interface QueryPostsParams extends BaseQueryParams {
  author_id?: number;
  topic_ids?: string;
  filter?: PostFilters;
}

export interface CreatePostParams {
  title: string;
  content: string;
  status: PostStatuses;
  description: string;
  topic_ids: number[];
  thumbnail?: File;
}
