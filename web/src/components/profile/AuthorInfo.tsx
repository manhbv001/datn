import { formatNumberWithUnit } from '@/utils/number.util';
import { FC } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { BsFlag, BsPen } from 'react-icons/bs';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import CommonButton from '../common/CommonButton';

interface IAuthorInfo {
  view_count: string | number;
  like_count: string | number;
  post_count: string | number;
  follower_count: string | number;
  followings_count: string | number;
}
const AuthorInfo: FC<IAuthorInfo> = (props) => {
  return (
    <div className="w-full flex flex-col gap-3 p-4 border rounded-md">
      <div className="flex justify-between items-center">
        <span className="opacity-70" style={{ fontSize: 15 }}>
          <BsPen
            style={{
              marginRight: 2,
              color: 'var(--text-gray-color)',
              display: 'inline-block',
            }}
          />{' '}
          Tổng số bài viết
        </span>
        <span className="font-semibold">{props.post_count}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="opacity-70" style={{ fontSize: 15 }}>
          <GrView
            style={{
              marginRight: 2,
              opacity: 0.4,
              color: 'var(--text-gray-color)',
              display: 'inline-block',
            }}
          />{' '}
          Tổng số lượt xem
        </span>
        <span className="font-semibold">
          {formatNumberWithUnit(Number(props.view_count || 0))}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="opacity-70" style={{ fontSize: 15 }}>
          <AiOutlineLike
            size={17}
            style={{
              color: 'var(--text-gray-color)',
              display: 'inline-block',
            }}
          />{' '}
          Tổng số lượt yêu thích
        </span>
        <span className="font-semibold">{props.like_count}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="opacity-70" style={{ fontSize: 15 }}>
          <FiUserPlus
            style={{
              marginRight: 3,
              color: 'var(--text-gray-color)',
              display: 'inline-block',
              transform: 'translate(2px, -1px)',
            }}
          />{' '}
          Người theo dõi
        </span>
        <span className="font-semibold">{props.follower_count}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="opacity-70" style={{ fontSize: 15 }}>
          <FiUserCheck
            style={{
              marginRight: 4,
              color: 'var(--text-gray-color)',
              display: 'inline-block',
              transform: 'translate(2px, -1px)',
            }}
          />{' '}
          Đang theo dõi
        </span>
        <span className="font-semibold">{props.followings_count}</span>
      </div>
      <CommonButton type="regular" style={{ marginTop: 16 }}>
        <BsFlag /> Báo cáo
      </CommonButton>
    </div>
  );
};

export default AuthorInfo;
