import { JobModel } from '@/models/job.model';
import { formatNumberWithUnit } from '@/utils/number.util';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import SaveButton from './SaveButton';

export interface IJobItemLargeProps {
  data: JobModel;
}
const JobItemLarge: FC<IJobItemLargeProps> = ({ data }) => {
  return (
    <div
      key={data.id}
      className="bg-white p-3 rounded border flex items-center space-x-4"
    >
      <Image
        src={data.enterprise.logo || '/default-image.jpg'}
        width={200}
        height={200}
        alt={data.enterprise.name}
        className="w-28 h-28 rounded object-cover"
      />
      <div className="flex-grow">
        <Link
          href={`/jobs/${data.slug}`}
          className="text-lg mb-2 font-semibold"
        >
          {data.title}
        </Link>
        <p className="text-gray-600 mb-1 uppercase text-sm mt-1 opacity-70">
          {data.enterprise.name}
        </p>
        <div className="flex mt-4">
          <div className="flex items-center text-gray-600">
            <span className="text-sm mr-2">Mức lương: </span>
            <AiOutlineDollar color="var(--primary-color)" />
            {data.salary_from && data.salary_to ? (
              <p className="text-[13px] ml-1">
                {`${formatNumberWithUnit(
                  data.salary_from,
                  0,
                )} - ${formatNumberWithUnit(data.salary_to, 0)}`}
              </p>
            ) : (
              <p className="text-[13px] ml-1 font-semibold">Thỏa thuận</p>
            )}
          </div>
          <div className="flex items-center text-gray-600 ml-12">
            <span className="text-sm mr-2">Địa điểm: </span>
            <CiLocationOn color="var(--primary-color)" />
            <p className="text-[13px] ml-1 font-semibold">
              {data.province.name}
            </p>
          </div>
          <SaveButton jobId={data.id} saved={!!data.saved} />
        </div>
      </div>
    </div>
  );
};

export default JobItemLarge;
