import { JobModel } from '@/models/job.model';
import { formatNumberWithUnit } from '@/utils/number.util';
import Image from 'next/image';
import { FC } from 'react';
import { AiOutlineDollar } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';

export interface IJobItemSmallProps {
  data: JobModel;
}
const JobItemSmall: FC<IJobItemSmallProps> = ({ data }) => {
  return (
    <div
      key={data.id}
      className="bg-white p-2 border-b flex items-center space-x-2"
    >
      <Image
        src={data.enterprise.logo || '/default-image.jpg'}
        alt={data.enterprise.name}
        width={100}
        height={100}
      />
      <div>
        <h5 className="text-[13px] font-semibold">{data.title}</h5>
        <div className="flex">
          <div className="flex items-center text-gray-600">
            <AiOutlineDollar color="var(--primary-color)" />
            {data.salary_from && data.salary_to ? (
              <p className="text-[12px] ml-1">
                {`${formatNumberWithUnit(
                  data.salary_from,
                  0,
                )} - ${formatNumberWithUnit(data.salary_to, 0)}`}
              </p>
            ) : (
              <p className="text-[12px] ml-1">Thỏa thuận</p>
            )}
          </div>
          <div className="flex items-center text-gray-600 ml-4">
            <CiLocationOn color="var(--primary-color)" />
            <p className="text-[12px] ml-1">{data.province.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItemSmall;
