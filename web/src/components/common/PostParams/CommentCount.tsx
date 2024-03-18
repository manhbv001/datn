import { FC } from 'react';
import { BsChat } from 'react-icons/bs';

export interface ICommentCountProps {
  count: number;
}
const CommentCount: FC<ICommentCountProps> = ({ count }) => {
  return (
    <div className="inline-block">
      <span className="inline-flex gap-1 items-center text-gray-400">
        <BsChat
          style={{
            opacity: 0.5,
            color: 'var(--text-gray-color)',
            display: 'inline-block',
            fontSize: 15,
            transform: 'translateY(-1px)',
          }}
        />
        {count}
      </span>
    </div>
  );
};

export default CommentCount;
