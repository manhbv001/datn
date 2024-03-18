'use client';
import useQueryParams from '@/hooks/useQueryParams';
import { QueryJobParams } from '@/models/job.model';
import { FC } from 'react';

export interface IJobListHeadlineProps {}
const JobListHeadline: FC<IJobListHeadlineProps> = () => {
  const { queryParams } = useQueryParams<QueryJobParams>();

  return (
    <div>
      <div className="p-3 text-white flex items-center justify-between bg-[var(--primary-color)] rounded">
        <h3 className="text-xl">{queryParams.headline || 'Việc làm mới'}</h3>
      </div>
    </div>
  );
};

export default JobListHeadline;
