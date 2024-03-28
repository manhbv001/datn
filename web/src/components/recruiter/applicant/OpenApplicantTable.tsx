'use client';

import useQueryParams from '@/hooks/useQueryParams';
import { ApplicantProfileModel } from '@/models/applicant-profile.model';
import { QueryApplicantsParams } from '@/models/applicant.model';
import { ApplicantLevel, Gender } from '@/models/common';
import { applicantProfileService } from '@/services/applicant-profile.service';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import OpenApplicantAction from './OpenApplicantAction';

interface ITableColumData {
  order: number;
  id: number;
  display_name: string;
  gender: Gender;
  dob: string;
  level: ApplicantLevel;
  occupation: string;
  work_place: string;
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
    title: 'Họ tên',
    width: 40,
    dataIndex: 'display_name',
    key: 'display_name',
  },
  {
    title: 'Giới tính',
    width: 40,
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Ngày sinh',
    width: 40,
    dataIndex: 'dob',
    key: 'dob',
  },
  {
    title: 'Vị trí',
    width: 40,
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Lĩnh vực',
    width: 40,
    dataIndex: 'occupation',
    key: 'occupation',
  },
  {
    title: 'Địa điểm',
    width: 40,
    dataIndex: 'work_place',
    key: 'work_place',
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 15,
    render: (payload: ITableColumData) => {
      return <OpenApplicantAction applicantId={payload.id} />;
    },
  },
];

const OpenApplicantsTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryApplicantsParams>();
  const [profiles, setProfiles] = useState<ApplicantProfileModel[]>([]);

  useEffect(() => {
    applicantProfileService.query({}).then((response) => {
      if (response.success) setProfiles(response.data.profiles);
    });
  }, [queryParams]);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return profiles.map((profile, index) => {
      return {
        order: index + 1,
        id: profile.id,
        display_name: profile.display_name,
        dob: dayjs(profile.date_of_birth).format('DD/MM/YYYY'),
        gender: profile.gender,
        level: profile.level,
        occupation: profile.occupations.map((item) => item.name).join(', '),
        work_place: profile.workProvinces.map((item) => item.name).join(', '),
      };
    });
  }, [profiles]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 1620 }}
      sticky
    />
  );
};

export default OpenApplicantsTable;
