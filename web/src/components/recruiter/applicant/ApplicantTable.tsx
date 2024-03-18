'use client';

import useQueryParams from '@/hooks/useQueryParams';
import datetime from '@/libs/datetime';
import {
  ApplicantModel,
  ApplicantStatus,
  QueryApplicantsParams,
} from '@/models/applicant.model';
import { applicantService } from '@/services/applicant.service';
import { ColorUtils } from '@/utils/color.util';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useMemo, useState } from 'react';
import ApplicantAction from './ApplicantAction';

interface ITableColumData {
  order: number;
  id: number;
  display_name: string;
  job_title: string;
  created_at: string;
  status: ApplicantStatus;
}

const columns: ColumnsType<ITableColumData> = [
  {
    title: '#',
    width: 1,
    dataIndex: 'order',
    key: 'order',
    fixed: 'left',
  },
  {
    title: 'ID',
    width: 1,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Họ tên',
    width: 3,
    dataIndex: 'display_name',
    key: 'display_name',
  },
  {
    title: 'Công việc ứng tuyển',
    width: 6,
    dataIndex: 'job_title',
    key: 'job_title',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 2,
    render(value: ApplicantStatus) {
      return <Tag color={ColorUtils.applicantStatus[value]}>{value}</Tag>;
    },
  },
  {
    title: 'Ngày ứng tuyển',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 2,
    render(value) {
      return value ? datetime.formattedDate(value) : '--';
    },
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 2,
    render: (payload: ITableColumData) => {
      return <ApplicantAction applicantId={payload.id} />;
    },
  },
];

const ApplicantsTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryApplicantsParams>();
  const [applicants, setApplicants] = useState<ApplicantModel[]>([]);

  useEffect(() => {
    applicantService
      .getByEnterprise({
        job_id: queryParams.job_id,
      })
      .then((response) => {
        if (response.success) setApplicants(response.data.applicants);
      });
  }, [queryParams]);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return applicants.map((applicant, index) => {
      return {
        order: index + 1,
        id: applicant.id,
        job_title: applicant.job.title,
        status: applicant.status,
        display_name: applicant.applicant_profile.display_name,
        created_at: applicant.created_at!,
      };
    });
  }, [applicants]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 1620 }}
      sticky
    />
  );
};

export default ApplicantsTable;
