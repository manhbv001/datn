'use client';
import datetime from '@/libs/datetime';
import { JobModel } from '@/models/job.model';
import { applicantService } from '@/services/applicant.service';
import { formatNumberWithUnit } from '@/utils/number.util';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

export interface IAppliedJobsProps {}
const AppliedJobs: FC<IAppliedJobsProps> = () => {
  const [appliedJobs, setAppliedJobs] = useState<
    (JobModel & { applyTime: string })[]
  >([]);

  useEffect(() => {
    document.title = 'Việc làm đã ứng tuyển';

    applicantService.getAppliedJobs().then((response) => {
      if (response.success) setAppliedJobs(response.data.appliedJobs);
    });
  }, []);

  return (
    <div className="p-3">
      <h3 className="font-semibold text-lg pl-4 pt-3">
        Danh sách việc làm bạn đã ứng tuyển
      </h3>
      <ul className="mt-4">
        <li className="py-2 rounded border-b">
          <div className="grid grid-cols-5">
            <div className="text-center col-span-2">
              <span className="text-[var(--primary-color)] font-semibold">
                Vị trí / Công ty
              </span>
            </div>
            <div className="text-center col-span-1">
              <span className="text-[var(--primary-color)] font-semibold">
                Địa điểm
              </span>
            </div>
            <div className="text-center col-span-1">
              <span className="text-[var(--primary-color)] font-semibold">
                Mức lương
              </span>
            </div>
            <div className="text-center col-span-1">
              <span className="text-[var(--primary-color)] font-semibold">
                Ngày ứng tuyển
              </span>
            </div>
          </div>
        </li>
        {appliedJobs.map((item) => (
          <li key={`applied_job_${item.id}`} className="py-2 border-b">
            <div className="grid grid-cols-5 items-center">
              <div className="text-center col-span-2">
                <Link
                  href={`/jobs/${item.slug}`}
                  className="block font-semibold"
                >
                  {item.title}
                </Link>
                <Link
                  href={`/companies/${item.enterprise.slug}`}
                  className="block uppercase opacity-70"
                >
                  {item.enterprise.name}
                </Link>
              </div>
              <div className="text-center col-span-1">
                <span>{item.province.name}</span>
              </div>
              <div className="text-center col-span-1">
                <span>
                  {item.salary_from && item.salary_to
                    ? `${formatNumberWithUnit(
                        item.salary_from,
                      )} - ${formatNumberWithUnit(item.salary_to)}`
                    : 'Thỏa thuận'}
                </span>
              </div>
              <div className="text-center col-span-1">
                <span>{datetime.formattedDate(item.applyTime!)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;
