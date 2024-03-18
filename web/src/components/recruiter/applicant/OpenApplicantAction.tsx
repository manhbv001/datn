'use client';
import { Modal, Tooltip } from 'antd';
import Link from 'next/link';
import { FC } from 'react';
import { LuEye } from 'react-icons/lu';

interface IOpenApplicantActionProps {
  applicantId: number;
}
const OpenApplicantAction: FC<IOpenApplicantActionProps> = ({
  applicantId,
}) => {
  const hanldeDeleteClick = () => {
    Modal.confirm({
      title: 'Are u sure?',
      okText: 'Delete',
      okType: 'default',
      cancelText: 'Cancel',
      type: 'warning',
      okButtonProps: {
        style: {
          color: 'red',
          borderColor: 'red',
        },
      },
      onOk() {
        // jobServices.deleteJob(applicantId).then((response) => {
        //   if (response.success) message.success('Successfully!');
        // });
      },
    });
  };

  return (
    <div className="flex gap-4">
      <Tooltip title="Chi tiết">
        <Link
          href={`/recruiter/applicants/profile/${applicantId}`}
          className="border-none cursor-pointer bg-transparent outline-none"
        >
          <LuEye size={16} style={{ color: 'blue' }} />
        </Link>
      </Tooltip>
    </div>
  );
};

export default OpenApplicantAction;
