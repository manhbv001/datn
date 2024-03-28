'use client';
import { enterpriseService } from '@/services/enterprise.service';
import { Switch, Tooltip } from 'antd';
import { FC, useState } from 'react';

interface IEnterpriseActionProps {
  enterpriseId: number;
  defaultValue: boolean;
}
const EnterpriseAction: FC<IEnterpriseActionProps> = ({
  enterpriseId,
  defaultValue,
}) => {
  const [status, setStatus] = useState(defaultValue);

  const handleChangeStatus = (value: boolean) => {
    enterpriseService.updateState(enterpriseId, value).then((response) => {
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

export default EnterpriseAction;
