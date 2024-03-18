'use client';

import { RecruiterStats } from '@/models/stats.model';
import { statsServices } from '@/services/stats.service';
import { Statistic } from 'antd';
import { FC, useEffect, useState } from 'react';

export interface IRecruiterOverallProps {}
const RecruiterOverall: FC<IRecruiterOverallProps> = () => {
  const [data, setData] = useState<RecruiterStats>();

  useEffect(() => {
    statsServices.recruiter().then((response) => {
      if (response.success) {
        setData(response.data);
      }
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Statistic title="Số lượt ứng tuyển" value={data?.totalApplicants} />
        </div>
        <div>
          <Statistic title="Tổng số trúng tuyển" value={data?.totalPassed} />
        </div>
        <div>
          <Statistic title="Tổng số đang xử lý" value={data?.totalProcessing} />
        </div>
        <div>
          <Statistic
            title="Tổng số đã phỏng vấn"
            value={data?.totalInterviewed}
          />
        </div>
        <div>
          <Statistic title="Tổng số đã từ chối" value={data?.totalRejected} />
        </div>
        <div>
          <Statistic title="Tổng số đã hẹn lịch" value={data?.totalScheduled} />
        </div>
      </div>
    </div>
  );
};

export default RecruiterOverall;
