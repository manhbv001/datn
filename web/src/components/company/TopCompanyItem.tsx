import { EnterpriseModel } from '@/models/enterprise.model';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { CiLocationOn } from 'react-icons/ci';

export interface ITopCompanyItemProps {
  data: EnterpriseModel;
}
const TopCompanyItem: FC<ITopCompanyItemProps> = ({ data }) => {
  return (
    <div className="h-full">
      <div className="rounded h-full border overflow-hidden">
        <div className="relative w-full aspect-[2]">
          <Image
            fill
            src={data.cover || '/default-image.jpg'}
            style={{ objectFit: 'cover' }}
            alt={data.name}
          />
        </div>
        <div className=" border-t px-4">
          <div className="flex">
            <div className="relative border rounded -top-[30px]">
              <Image
                src={data.logo || '/default-image.jpg'}
                width={80}
                height={80}
                alt={data.name}
              />
            </div>
            <Link
              href={`/companies/${data.slug}`}
              className="ml-2 mt-2 opacity-70 font-semibold"
            >
              {data.name}
            </Link>
          </div>
          <div className="flex mt-3 items-center relative -top-[30px]">
            <CiLocationOn color="var(--primary-color)" />
            <span className="text-sm ml-1 opacity-70 flex-shrink-0">
              Địa chỉ:
            </span>
            <p className="text-sm font-semibold ml-2 line-clamp-1 overflow-hidden">
              {data.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCompanyItem;
