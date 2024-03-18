import CommonButton from '@/components/common/CommonButton';
import Image from 'next/image';
import { FC } from 'react';

export interface IComingSoonProps {}
const ComingSoon: FC<IComingSoonProps> = () => {
  return (
    <div className="text-center max-w-[90%]">
      <div className="w-[350px] aspect-square relative">
        <Image src="/coming-soon.png" alt="" fill />
      </div>
      <h1 className="text-lg mb-8">This feature is coming soon</h1>
      <CommonButton link="/" type="regular">
        Home
      </CommonButton>
    </div>
  );
};

export default ComingSoon;
