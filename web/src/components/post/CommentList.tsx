'use client';
import { IComment } from '@/models/post';
import { FC, useState } from 'react';
import CommentComposer from './CommentComposer';
import CommentItem from './CommentItem';

export interface ICommentListProps {
  postId: number;
  initialComments: IComment[];
}
const CommentList: FC<ICommentListProps> = ({
  postId,
  initialComments = [],
}) => {
  const [comments, setComments] = useState<IComment[]>(
    initialComments.reverse(),
  );

  const handleCommentSuccess = (newComment: IComment) => {
    setComments([newComment, ...comments]);
  };

  return (
    <div>
      <CommentComposer postId={postId} onSuccess={handleCommentSuccess} />
      <div className="mt-10">
        <ul className="flex flex-col gap-10">
          {comments.map((cmt) => (
            <li key={`post-comment-${cmt.id}`}>
              <CommentItem data={cmt} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentList;
