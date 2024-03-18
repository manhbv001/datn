'use client';

import { AdminStats } from '@/models/stats.model';
import { statsServices } from '@/services/stats.service';
import { Statistic } from 'antd';
import { FC, useEffect, useState } from 'react';

export interface IAdminOverallProps {}
const AdminOverall: FC<IAdminOverallProps> = () => {
  const [data, setData] = useState<AdminStats>();

  useEffect(() => {
    statsServices.admin().then((response) => {
      if (response.success) {
        setData(response.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4">
        <div>
          <Statistic title="Số lượt ứng tuyển" value={data?.totalApplicants} />
        </div>
        <div>
          <Statistic title="Tổng số ứng viên" value={data?.totalProfiles} />
        </div>
        <div>
          <Statistic
            title="Tổng số trúng tuyển"
            value={data?.totalPassedApplicants}
          />
        </div>
        <div>
          <Statistic title="Tổng số công ty" value={data?.totalEnterprises} />
        </div>
      </div>
    </div>
  );
};

export default AdminOverall;
