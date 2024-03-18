'use client';

import postServices from '@/services/post.service';
import { FC, useEffect } from 'react';

export interface IInvokeViewPostProps {
  postId: number;
}
const InvokeViewPost: FC<IInvokeViewPostProps> = ({ postId }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      postServices.viewPost(postId);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [postId]);

  return null;
};

export default InvokeViewPost;
