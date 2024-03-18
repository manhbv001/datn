import { JobModel } from '@/models/job.model';
import { FC } from 'react';
import JobItem from '../common/JobItem';

export interface HotJobsProps {
  data: JobModel[];
}

const HotJobs: FC<HotJobsProps> = ({ data }) => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <div className="rounded p-3 mb-1 text-white flex items-center justify-between bg-[var(--primary-color)]">
          <h3 className="text-xl">Việc làm hot</h3>
          <a href="#" className="hover:underline text-white text-sm">
            Xem thêm
          </a>
        </div>

        <div className="p-2 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {data.map((job) => (
            <JobItem key={job.id} data={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotJobs;
