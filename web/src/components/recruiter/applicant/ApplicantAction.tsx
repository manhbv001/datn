'use client';
import { Modal, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { LuEye } from 'react-icons/lu';

interface IApplicantActionProps {
  applicantId: number;
}
const ApplicantAction: FC<IApplicantActionProps> = ({ applicantId }) => {
  const router = useRouter();

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
          href={`/recruiter/applicants/detail/${applicantId}`}
          className="border-none cursor-pointer bg-transparent outline-none"
        >
          <LuEye size={16} style={{ color: 'blue' }} />
        </Link>
      </Tooltip>
      <Tooltip title="Delete">
        <button
          className="border-none cursor-pointer bg-transparent outline-none"
          onClick={hanldeDeleteClick}
        >
          <AiOutlineDelete size={18} style={{ color: 'red' }} />
        </button>
      </Tooltip>
    </div>
  );
};

export default ApplicantAction;
