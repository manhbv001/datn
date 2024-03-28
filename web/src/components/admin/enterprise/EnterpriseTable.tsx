'use client';

import { AuthContext } from '@/contexts/auth/AuthProvider';
import useQueryParams from '@/hooks/useQueryParams';
import {
  EnterpriseModel,
  QueryEnterprisesParams,
} from '@/models/enterprise.model';
import { enterpriseService } from '@/services/enterprise.service';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import EnterpriseAction from './EnterpriseAction';

interface ITableColumData {
  order: number;
  id: number;
  name: string;
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
    title: 'Tên doanh nghiệp',
    width: 120,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Hành động',
    key: 'operation',
    fixed: 'right',
    width: 10,
    render: (payload: ITableColumData) => {
      return (
        <EnterpriseAction
          enterpriseId={payload.id}
          defaultValue={payload.is_active}
        />
      );
    },
  },
];

const EnterprisesTable: React.FC = () => {
  const { queryParams } = useQueryParams<QueryEnterprisesParams>();
  const { user } = useContext(AuthContext);
  const [enterprises, setEnterprises] = useState<EnterpriseModel[]>([]);

  useEffect(() => {
    enterpriseService.query({}).then((response) => {
      if (response.success) setEnterprises(response.data.enterprises);
    });
  }, [queryParams, user]);

  const tableData: ITableColumData[] = useMemo<ITableColumData[]>(() => {
    return enterprises.map((enterprise, index) => {
      return {
        order: index + 1,
        id: enterprise.id,
        name: enterprise.name,
        is_active: !!enterprise.is_active,
      };
    });
  }, [enterprises]);

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 1620 }}
      sticky
    />
  );
};

export default EnterprisesTable;
