'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import useQueryParams from '@/hooks/useQueryParams';
import {
  ApplicantProfileModel,
  QueryApplicantProfilesParams,
} from '@/models/applicant-profile.model';
import { applicantProfileService } from '@/services/applicant-profile.service';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ApplicantProfileAction from './ApplicantProfileAction';

interface ITableColumData {
  order: number;
  id: number;
  display_name: string;
  phone: string;
  province_name: string;
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
    title: 'Họ tên',
    width: 40,
    dataIndex: 'display_name',
    key: 'display_name',
  },
  {
    title: 'SDT/Email',
    width: 30,
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Thành phố',
    width: 30,
    dataIndex: 'province_name',
    key: 'province_name',
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 10,
    render: (payload: ITableColumData) => {
      return (
        <ApplicantProfileAction
          applicantProfileId={payload.id}
          defaultValue={payload.is_active}
        />
      );
    },
  },
];

const ApplicantProfileTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryApplicantProfilesParams>();
  const { user } = useContext(AuthContext);
  const [applicantProfile, setApplicantProfile] = useState<
    ApplicantProfileModel[]
  >([]);

  useEffect(() => {
    applicantProfileService.query({}).then((response) => {
      if (response.success) setApplicantProfile(response.data.profiles);
    });
  }, [queryParams, user]);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return applicantProfile.map((profile, index) => {
      return {
        order: index + 1,
        id: profile.id,
        display_name: profile.display_name,
        phone: profile.phone || profile.email || '',
        province_name: profile.province?.name || '',
        is_active: !!profile.is_active,
      };
    });
  }, [applicantProfile]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 1620 }}
      sticky
    />
  );
};

export default ApplicantProfileTable;
