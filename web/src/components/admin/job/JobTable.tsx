'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import useQueryParams from '@/hooks/useQueryParams';
import { JobModel, QueryJobParams } from '@/models/job.model';
import { jobServices } from '@/services/job.service';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import JobAction from './JobAction';

interface ITableColumData {
  order: number;
  id: number;
  title: string;
  enterprise_name: string;
  is_active: boolean;
}

const columns: ColumnsType<ITableColumData> = [
  {
    title: '#',
    width: 10,
    dataIndex: 'order',
    key: 'order',
    fixed: 'left',
  },
  {
    title: 'ID',
    width: 20,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tên',
    width: 80,
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Doanh nghiệp',
    width: 80,
    dataIndex: 'enterprise_name',
    key: 'enterprise_name',
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: (payload: ITableColumData) => {
      return <JobAction jobId={payload.id} defaultValue={payload.is_active} />;
    },
  },
];

const JobsTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryJobParams>();
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState<JobModel[]>([]);

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
        enterprise_id: queryParams?.enterprise_id,
      })
      .then((response) => {
        if (response.success) setJobs(response.data.jobs);
      });
  }, [queryParams, user]);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return jobs.map((job, index) => {
      return {
        order: index + 1,
        id: job.id,
        title: job.title,
        enterprise_name: job.enterprise.name,
        is_active: !!job.is_active,
      };
    });
  }, [jobs]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 1620 }}
      sticky
    />
  );
};

export default JobsTable;
