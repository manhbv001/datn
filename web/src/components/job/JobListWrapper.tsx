'use client';
import useQueryParams from '@/hooks/useQueryParams';
import { JobModel, QueryJobParams } from '@/models/job.model';
import { jobServices } from '@/services/job.service';
import { Alert } from 'antd';
import { FC, useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';
import JobList from './JobList';

const JobListWrapper: FC = () => {
  const { queryParams } = useQueryParams<QueryJobParams>();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [total, setTotal] = useState<undefined | number>();

  useEffect(() => {
    jobServices
      .query({
        arrangement: queryParams.arrangement,
        province_id: queryParams.province_id,
        occupation_id: queryParams.occupation_id,
        level: queryParams.level,
        salary_range: queryParams.salary_range,
        order_by: queryParams.order_by,
        order_key: queryParams.order_key,
      })
      .then((response) => {
        setJobs(response.data.jobs);
        setTotal(response.data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryParams]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {jobs?.length === 0 ? (
            <div>
              <Alert type="warning" description="Không có dữ liệu" />
            </div>
          ) : (
            <JobList data={jobs} />
          )}
          {total ? (
            <div className="mt-8 text-right">
              <Pagination totalPage={total} currentItem={1} />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default JobListWrapper;
