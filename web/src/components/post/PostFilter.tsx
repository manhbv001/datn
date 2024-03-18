'use client';
import { POST_FILTER } from '@/app/(feature)/posts/data';
import useQueryParams from '@/hooks/useQueryParams';
import { PostFilters, QueryPostsParams } from '@/models/post';
import { FC } from 'react';
import './post-filter.css';

export interface IPostFilterProps {}
const PostFilter: FC<IPostFilterProps> = () => {
  const { queryParams, setQueryParams } = useQueryParams<QueryPostsParams>();

  const handleCategoryClick = (value: PostFilters) => {
    setQueryParams({ filter: value });
  };

  return (
    <>
      <div className="bg-[var(--brown)] max-w-[100vw]">
        <div className="block container mx-auto overflow-y-auto no-scrollbar md:flex justify-between">
          <ul className="block md:flex gap-x-4 w-[610px] max-w-[unset]">
            {POST_FILTER.map((item) => {
              const isActive =
                item.value ===
                (Number(queryParams.filter) || PostFilters.Latest);
              return (
                <li
                  key={item.key}
                  className={`text-white inline-block py-4 font-semibold cursor-pointer active-menu-item ${
                    isActive ? 'active' : ''
                  } flex-shrink-0`}
                  onClick={() => handleCategoryClick(item.value)}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PostFilter;
