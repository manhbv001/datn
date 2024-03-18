import { EnterpriseModel } from '@/models/enterprise.model';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { CiLocationOn } from 'react-icons/ci';

export interface ICompanyItemProps {
  data: EnterpriseModel;
}
const CompanyItem: FC<ICompanyItemProps> = ({ data }) => {
  return (
    <div className="p-2 border-b">
      <div className="flex">
        <div className="flex-shrink-0">
          <Image
            style={{ objectFit: 'fill' }}
            width={80}
            height={80}
            alt={data.name}
            src={data.logo || '/default-image.jpg'}
          />
        </div>
        <div className="ml-3">
          <Link
            href={`/companies/${data.slug}`}
            className="font-semibold mt-3 opacity-80"
          >
            {data.name}
          </Link>
          <div className="flex mt-3 items-center">
            <CiLocationOn color="var(--primary-color)" />
            <span className="text-sm ml-1 opacity-70 flex-shrink-0">
              Địa chỉ:
            </span>
            <p className="text-sm ml-2 line-clamp-1">{data.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyItem;
