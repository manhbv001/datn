import { JobModel } from '@/models/job.model';
import { formatNumberWithUnit } from '@/utils/number.util';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';

export interface IJobItemProps {
  data: JobModel;
}
const JobItem: FC<IJobItemProps> = ({ data }) => {
  return (
    <div
      key={data.id}
      className="bg-white p-3 rounded border flex items-center space-x-4"
    >
      <Image
        src={data.enterprise.logo || '/default-image.jpg'}
        alt={data.title}
        className="w-16 h-16 rounded object-cover"
        width={200}
        height={200}
      />
      <div>
        <Link href={`/jobs/${data.slug}`} className="text-sm font-semibold">
          {data.title}
        </Link>
        <p className="text-gray-600 mb-1 uppercase text-xs mt-1 opacity-70">
          {data.enterprise.name}
        </p>
        <div className="flex">
          <div className="flex items-center text-gray-600">
            <AiOutlineDollar color="var(--primary-color)" />
            {data.salary_from && data.salary_to ? (
              <p className="text-[13px] ml-1">
                {`${formatNumberWithUnit(
                  data.salary_from,
                  0,
                )} - ${formatNumberWithUnit(data.salary_to, 0)}`}
              </p>
            ) : (
              <p className="text-[13px] ml-1">Thỏa thuận</p>
            )}
          </div>
          <div className="flex items-center text-gray-600 ml-4">
            <CiLocationOn color="var(--primary-color)" />
            <p className="text-[13px] ml-1">{data.province.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
