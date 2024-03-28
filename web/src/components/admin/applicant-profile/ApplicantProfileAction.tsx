'use client';
import { applicantProfileService } from '@/services/applicant-profile.service';
import { Switch, Tooltip } from 'antd';
import { FC, useState } from 'react';

interface IApplicantProfileActionProps {
  applicantProfileId: number;
  defaultValue: boolean;
}
const ApplicantProfileAction: FC<IApplicantProfileActionProps> = ({
  applicantProfileId,
  defaultValue,
}) => {
  const [status, setStatus] = useState(defaultValue);

  const handleChangeStatus = (value: boolean) => {
    applicantProfileService
      .updateState(applicantProfileId, value)
      .then((response) => {
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

export default ApplicantProfileAction;
