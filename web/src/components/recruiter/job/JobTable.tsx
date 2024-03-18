'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import useQueryParams from '@/hooks/useQueryParams';
import datetime from '@/libs/datetime';
import {
  JobLevels,
  JobModel,
  JobStatus,
  QueryJobParams,
} from '@/models/job.model';
import { jobServices } from '@/services/job.service';
import { ColorUtils } from '@/utils/color.util';
import { formatNumberWithUnit } from '@/utils/number.util';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import JobAction from './JobAction';

interface ITableColumData {
  order: number;
  id: number;
  title: string;
  salary_from: number;
  salary_to: number;
  headcount: number;
  level: JobLevels;
  expired_date: string;
  status: string;
  total_applicants: number;
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
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 30,
    render(value: JobStatus) {
      return <Tag color={ColorUtils.jobStatus[value]}>{value}</Tag>;
    },
  },
  {
    title: 'Lương',
    key: 'salary',
    width: 40,
    render(payload: ITableColumData) {
      return `${formatNumberWithUnit(
        payload.salary_from,
      )} - ${formatNumberWithUnit(payload.salary_to)}`;
    },
  },
  {
    title: 'Số lượng',
    dataIndex: 'headcount',
    key: 'headcount',
    width: 20,
  },
  {
    title: 'Thời hạn',
    dataIndex: 'expired_date',
    key: 'expired_date',
    width: 50,
    render(value) {
      return value ? datetime.formattedDate(value) : '--';
    },
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 20,
    render: (payload: ITableColumData) => {
      return (
        <JobAction applicants={payload.total_applicants} jobId={payload.id} />
      );
    },
  },
];

const JobsTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryJobParams>();
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState<JobModel[]>([]);

  useEffect(() => {
    jobServices
      .queryByEnterprise({
        arrangement: queryParams.arrangement,
        province_id: queryParams.province_id,
        occupation_id: queryParams.occupation_id,
        level: queryParams.level,
        salary_range: queryParams.salary_range,
        order_by: queryParams.order_by,
        order_key: queryParams.order_key,
        enterprise_id: user?.enterprise_id,
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
        salary_from: job.salary_from,
        salary_to: job.salary_to,
        headcount: job.headcount,
        level: job.level,
        expired_date: job.expired_date,
        status: job.status,
        total_applicants: job.total_applicants || 0,
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
