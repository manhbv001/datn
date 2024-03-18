'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import { IComment } from '@/models/post';
import postServices from '@/services/post.service';
import { Alert, Mentions } from 'antd';
import Image from 'next/image';
import { FC, useContext, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

export interface ICommentComposerProps {
  postId: number;
  onSuccess: (newComment: IComment) => void;
}
const CommentComposer: FC<ICommentComposerProps> = ({ postId, onSuccess }) => {
  const [value, setValue] = useState('');
  const { user, loading } = useContext(AuthContext);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!value.trim()) return;
    postServices.comment(postId, value).then((response) => {
      if (response.success) {
        setValue('');
        onSuccess(response.data);
      }
    });
  };

  if (loading) return null;
  if (!user)
    return <Alert message="Đăng nhập để có thể bình luận!" type="warning" />;
  return (
    <div className="flex">
      <div className="flex-shrink-0 mr-4 relative w-[58px] h-[58px] overflow-hidden border rounded-full">
        <Image alt="" fill src={user?.avatar_url || ''} />
      </div>
      <div className="flex-grow relative">
        <Mentions
          value={value}
          placeholder="Viết bình luận của bạn"
          style={{ paddingRight: 32 }}
          onPressEnter={handleSubmit}
          onChange={(text) => setValue(text)}
          rows={3}
        />
        <div className="absolute right-2 top-3 opacity-50">
          <BsArrowReturnLeft />
        </div>
      </div>
    </div>
  );
};

export default CommentComposer;
