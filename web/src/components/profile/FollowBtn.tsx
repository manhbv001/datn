'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import userServices from '@/services/user.service';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FiUserCheck } from 'react-icons/fi';
import CommonButton from '../common/CommonButton';

export interface IFollowBtnProps {
  authorId: number;
}
const FollowBtn: FC<IFollowBtnProps> = ({ authorId }) => {
  const [followed, setFollowed] = useState<string | boolean>('pending');
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const follow = () => {
    if (!user)
      return router.replace(`/sign-in?redirect=${window.location.href}`);
    userServices.follow({ author_id: authorId }).then((response) => {
      if (response.success) setFollowed(!followed);
    });
  };

  useEffect(() => {
    userServices.followStatus(authorId).then((response) => {
      if (response.success) setFollowed(response.data.followed);
    });
  }, [authorId]);

  if (followed === 'pending' || user?.id === authorId) return;
  return (
    <CommonButton
      type="primary"
      style={{ fontSize: 18, paddingLeft: 18, paddingRight: 18 }}
      onClick={follow}
    >
      {followed ? (
        <FiUserCheck />
      ) : (
        <>
          <BiPlus style={{}} />
          Follow
        </>
      )}
    </CommonButton>
  );
};

export default FollowBtn;
