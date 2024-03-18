'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { PostActionTypes } from '@/models/post';
import postServices from '@/services/post.service';
import { Popover, message } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, Suspense, lazy, useContext, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

const SharePopup = lazy(() => import('@/components/common/SharePopup'));

export interface IOptionsProps {
  postId: number;
  postSlug: string;
}
const Options: FC<IOptionsProps> = ({ postId, postSlug }) => {
  const { user } = useContext(AuthContext);
  const [openShare, setOpenShare] = useState(false);

  const router = useRouter();

  const savePost = async () => {
    if (!user)
      return router.replace(`/sign-in?redirect=${window.location.href}`);

    const { data: reactStatus } = await postServices.getReactStatus(postId);
    if (reactStatus.bookmarked) return message.success('Đã lưu bài viết!');

    const response = await postServices.reactPost(postId, {
      type: PostActionTypes.Bookmark,
    });
    if (response.success) return message.success('Đã lưu bài viết!');
  };

  const handleShareClose = () => {
    setOpenShare(false);
  };

  const OptionMenu = (
    <ul>
      <li className="last:border-none">
        <button
          onClick={() => setOpenShare(true)}
          className="py-1 px-1 min-w-[100px] block border-b"
        >
          Chia sẻ
        </button>
        <button onClick={savePost} className="py-1 px-1 min-w-[100px] block">
          Lưu
        </button>
      </li>
    </ul>
  );
  return (
    <>
      {openShare && (
        <Suspense fallback={null}>
          <SharePopup
            url={`${window.location.href}posts/${postSlug}`}
            onClose={handleShareClose}
            open={true}
          />
        </Suspense>
      )}
      <Popover trigger="click" content={OptionMenu}>
        <div className="flex items-center">
          <button>
            <BsThreeDots style={{ opacity: 0.6 }} />
          </button>
        </div>
      </Popover>
    </>
  );
  return <div></div>;
};

export default Options;
