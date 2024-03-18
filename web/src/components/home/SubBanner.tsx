import { FC } from 'react';

export interface ISubBannerProps {
  src: string;
}
const SubBanner: FC<ISubBannerProps> = ({ src }) => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <img className='w-full' src={src} />
      </div>
    </div>
  );
};

export default SubBanner;
