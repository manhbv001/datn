import { PostFilters } from '@/models/post';

export const POST_FILTER = [
  {
    value: PostFilters.Latest,
    label: 'Mới nhất',
    key: 'post-filter-latest',
  },
  {
    value: PostFilters.Following,
    label: 'Đang theo dõi',
    key: 'post-filter-follow',
  },
  {
    value: PostFilters.Trending,
    label: 'Nổi bật',
    key: 'post-filter-featured',
  },
  {
    value: PostFilters.Discuss,
    label: 'Thảo luận',
    key: 'post-filter-discuss',
  },
  {
    value: PostFilters.Following,
    label: 'Đang theo dõi',
    key: 'post-filter-follow',
  },
  {
    value: PostFilters.Bookmarked,
    label: 'Đã lưu',
    key: 'post-filter-saved',
  },
];
