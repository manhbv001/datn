import { JobModel } from '@/models/job.model';
import { FC } from 'react';
import JobItem from '../common/JobItem';
import JobItemSmall from '../common/JobItemSmall';
export interface HighSalaryJobsProps {
  data: JobModel[];
}

const HighSalaryJobs: FC<HighSalaryJobsProps> = ({ data }) => {
  return (
    <section className="py-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div>
              <div className="p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
                <h3 className="text-xl">Việc làm hot</h3>
                <a href="#" className="hover:underline text-white text-sm">
                  Xem thêm
                </a>
              </div>

              <div className="p-2 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {data.map((job) => (
                  <JobItem key={job.id} data={job} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <div className="rounded p-3 mb-1 text-white flex items-center justify-between bg-[var(--primary-color)]">
                <h3 className="text-xl">Việc làm tiêu điểm</h3>
                <a href="#" className="hover:underline text-white text-sm">
                  Xem thêm
                </a>
              </div>
              <div>
                {data.slice(0, 8).map((job) => (
                  <JobItemSmall key={job.id} data={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighSalaryJobs;
