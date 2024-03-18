import { JobModel } from '@/models/job.model';
import { FC } from 'react';
import JobItem from '../common/JobItem';
export interface AttractiveJobsProps {
  data: JobModel[];
}

const AttractiveJobs: FC<AttractiveJobsProps> = ({ data }) => {
  return (
    <section className="py-4 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div>
              <div className="rounded p-3 mb-1 text-white flex items-center justify-between bg-[var(--primary-color)]">
                <h3 className="text-xl">Việc làm hấp dẫn</h3>
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
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/job-fair-flyer-temolate-design-template-0f2a90547c3eb228b0d07bba32ea0199_screen.jpg?ts=1637038695"
              alt="Catalog"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractiveJobs;
