'use client';
import { jobServices } from '@/services/job.service';
import { Switch, Tooltip } from 'antd';
import { FC, useState } from 'react';

interface IJobActionProps {
  jobId: number;
  defaultValue: boolean;
}
const JobAction: FC<IJobActionProps> = ({ jobId, defaultValue }) => {
  const [status, setStatus] = useState(defaultValue);

  const handleChangeStatus = (value: boolean) => {
    jobServices.updateState(jobId, value).then((response) => {
      if (response.success) setStatus(value);
    });
  };

  return (
    <div className="flex gap-4 justify-center">
      <Tooltip title="Change status">
        <Switch onChange={handleChangeStatus} checked={status} />
      </Tooltip>
    </div>
  );
};

export default JobAction;
