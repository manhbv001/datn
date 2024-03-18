import { JobModel } from '@/models/job.model';
import { FC } from 'react';
import JobItemLarge from '../common/JobItemLarge';

export interface IJobListProps {
  data: JobModel[];
}
const JobList: FC<IJobListProps> = ({ data }) => {
  return (
    <div>
      <div className="bg-white grid grid-cols-1 gap-4 pt-2 py-2">
        {data.map((job: JobModel) => (
          <JobItemLarge key={job.id} data={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
