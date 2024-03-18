import VerticalJobFilters from '@/components/common/VerticalJobFilters';
import JobListHeadline from '@/components/job/JobListHeadline';
import JobListWrapper from '@/components/job/JobListWrapper';
import { FC } from 'react';

export interface IJobsPageProps {}
const JobsPage: FC<IJobsPageProps> = async () => {
  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 gap-4 items-stretch">
          <div className="col-span-3">
            <div>
              <JobListHeadline />
              <div className="py-2">
                <JobListWrapper />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="border rounded">
              <VerticalJobFilters />
            </div>
            <div className="mt-4">
              <img
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/job-fair-flyer-temolate-design-template-0f2a90547c3eb228b0d07bba32ea0199_screen.jpg?ts=1637038695"
                alt="Catalog"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
