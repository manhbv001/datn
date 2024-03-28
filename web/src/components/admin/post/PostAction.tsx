'use client';
import postServices from '@/services/post.service';
import { Switch, Tooltip } from 'antd';
import { FC, useState } from 'react';

interface IPostActionProps {
  postId: number;
  defaultValue: boolean;
}
const PostAction: FC<IPostActionProps> = ({ postId, defaultValue }) => {
  const [status, setStatus] = useState(defaultValue);

  const handleChangeStatus = (value: boolean) => {
    postServices.updateState(postId, value).then((response) => {
      if (response.success) setStatus(value);
    });
  };

  return (
    <div className="flex gap-4 justify-center">
      <Tooltip title="Change status">
        <Switch onChange={handleChangeStatus} checked={status} />
      </Tooltip>
    </div>
  );
};

export default PostAction;
