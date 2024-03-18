import JobItem from '@/components/common/JobItem';
import JobActions from '@/components/job/JobAction';
import datetime from '@/libs/datetime';
import { jobServices } from '@/services/job.service';
import { formatNumberWithUnit } from '@/utils/number.util';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { BsFillShiftFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { FaLocationDot, FaPeopleGroup } from 'react-icons/fa6';
import { IoMdBusiness } from 'react-icons/io';
import { MdLocationOn, MdMapsHomeWork } from 'react-icons/md';
export interface IJobDetailPageProps {
  params: {
    slug: string;
  };
}
const JobDetailPage: FC<IJobDetailPageProps> = async ({ params: { slug } }) => {
  const { data: job } = await jobServices.findBySlug(slug);
  const {
    data: { jobs: relatedJobs },
  } = await jobServices.query({
    occupation_id: job.occupation_id,
    size: 4,
    except_item: job.id,
  });

  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-4 p-2 border rounded overflow-hidden flex">
          <div className="aspect-square relative w-[220px] max-w-[1/3] border">
            <Image
              src={job.enterprise.logo || '/default-image.jpg'}
              alt={job.title}
              fill
            />
          </div>
          <div className="ml-6 py-4">
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <div className="flex mt-2">
              <IoMdBusiness
                size={24}
                style={{ color: 'var(--primary-color)' }}
              />
              <Link
                href={`/companies/${job.enterprise.id}`}
                className="ml-1 uppercase font-semibold text-[var(--primary-color)]"
                style={{ transform: 'translateY(2px)' }}
              >
                {job.enterprise.name}
              </Link>
            </div>
            <div className="flex gap-x-3 mt-4">
              <strong>Khu vực tuyển dụng:</strong>
              <span>{job.province.name}</span>
            </div>
            <div className="flex gap-x-3 mt-2">
              <strong>Mức lương:</strong>
              <span>
                {job.salary_from
                  ? `${formatNumberWithUnit(
                      job.salary_from,
                    )} - ${formatNumberWithUnit(job.salary_to)}`
                  : 'Thương lượng'}
              </span>
            </div>
            <div className="flex gap-x-3 mt-2">
              <strong>Thời hạn ứng tuyển:</strong>
              <span>
                {job.expired_date
                  ? datetime.formattedDate(job.expired_date)
                  : 'N/A'}
              </span>
            </div>
            <div className="flex gap-x-3 mt-2">
              <strong>Lĩnh vực ngành nghề:</strong>
              <Link
                href={`/jobs?occupation_id=${job.occupation.id}`}
                className="text-[var(--primary-color)] font-semibold"
              >
                {job.occupation?.name}
              </Link>
            </div>
          </div>
          <div className="ml-auto py-8 mr-8">
            <JobActions job={job} />
          </div>
        </div>
        <div className="mt-4 px-5 py-6 bg-gray-50 rounded overflow-hidden grid grid-cols-3 gap-x-8">
          <div className="col-span-2">
            <div>
              <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
                Mô tả công việc
              </h4>
              <div className="mt-4">
                <div dangerouslySetInnerHTML={{ __html: job.description }} />
              </div>
            </div>
            <div className="mt-12">
              <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
                Quyền lợi được hưởng
              </h4>
              <div className="mt-4">
                <div dangerouslySetInnerHTML={{ __html: job.benefit }} />
              </div>
            </div>
            <div className="mt-12">
              <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
                Yêu cầu công việc
              </h4>
              <div className="mt-4">
                <div dangerouslySetInnerHTML={{ __html: job.requirement }} />
              </div>
            </div>
            <div className="mt-12">
              <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
                Địa điểm làm việc
              </h4>
              <div className="mt-4">
                <div dangerouslySetInnerHTML={{ __html: job.work_place }} />
              </div>
            </div>
            <div className="mt-12">
              <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
                Thời gian làm việc
              </h4>
              <div className="mt-4">
                <div dangerouslySetInnerHTML={{ __html: job.work_time }} />
              </div>
            </div>
          </div>
          <div className="col-span-1 border-l pl-8">
            <div className="flex">
              <span className="flex items-center">
                <FaUser style={{ marginBottom: 2 }} />{' '}
                <span className="ml-2">Vị trí: </span>
              </span>
              <span className="ml-2 font-semibold">{job.level}</span>
            </div>

            <div className="flex mt-4">
              <span className="flex items-center">
                <FaPeopleGroup /> <span className="ml-2">Số lượng tuyển: </span>
              </span>
              <span className="ml-2 font-semibold">{job.headcount}</span>
            </div>

            <div className="flex mt-4">
              <span className="flex items-center">
                <BsFillShiftFill />
                <span className="ml-2">Hình thức làm việc: </span>
              </span>
              <span className="ml-2 font-semibold">
                {job.arrangement || 'Full-time'}
              </span>
            </div>

            <div className="flex items-start mt-4">
              <span className="flex items-center flex-shrink-0">
                <FaLocationDot />
                <span className="ml-2">Khu vực: </span>
              </span>
              <span className="ml-2 font-semibold">{job.province.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 px-5 py-6 bg-gray-50 rounded overflow-hidden">
          <div>
            <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
              Thông tin công ty
            </h4>
            <div className="mt-4">
              <div className="flex">
                <span className="flex items-center flex-shrink-0">
                  <MdMapsHomeWork />
                  <span className="ml-2">Giới thiệu: </span>
                </span>
                <span className="ml-2 font-semibold line-clamp-1">
                  {job.enterprise.description}
                </span>
              </div>

              <div className="flex mt-4">
                <span className="flex items-center">
                  <MdLocationOn />
                  <span className="ml-2">Địa chỉ: </span>
                </span>
                <span className="ml-2 font-semibold">
                  {job.enterprise.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 px-5 py-6 bg-gray-50 rounded overflow-hidden">
          <div>
            <h4 className="uppercase text-lg font-semibold text-[var(--brown)]">
              Việc làm khác
            </h4>
            <ul className="grid grid-cols-2 gap-4 mt-6">
              {relatedJobs.map((item) => (
                <li key={`rleatedjob_${item.id}`} className="col-span-1">
                  <JobItem data={item} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
