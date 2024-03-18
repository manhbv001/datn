import { FC } from 'react';
import { FiBookmark } from 'react-icons/fi';

export interface IBookmarkCountProps {
  count: number;
}
const BookmarkCount: FC<IBookmarkCountProps> = ({ count }) => {
  return (
    <div className="inline-block">
      <span className="inline-flex gap-1 items-center text-gray-400">
        <FiBookmark
          style={{
            opacity: 0.5,
            color: 'var(--text-gray-color)',
            display: 'inline-block',
            fontSize: 15,
          }}
        />
        {count}
      </span>
    </div>
  );
};

export default BookmarkCount;
