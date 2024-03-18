'use client';
import { Badge, Modal, Tooltip } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit3 } from 'react-icons/fi';
import { LuUsers } from 'react-icons/lu';

interface IJobActionProps {
  jobId: number;
  applicants: number;
}
const JobAction: FC<IJobActionProps> = ({ jobId, applicants }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/recruiter/jobs/edit/${jobId}`);
  };

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
        // jobServices.deleteJob(jobId).then((response) => {
        //   if (response.success) message.success('Successfully!');
        // });
      },
    });
  };

  return (
    <div className="flex gap-4">
      <Link
        href={`/recruiter/applicants?job_id=${jobId}`}
        className="border-none cursor-pointer bg-transparent outline-none"
      >
        <Badge count={applicants}>
          <Tooltip title="Danh sách ứng viên">
            <LuUsers
              size={16}
              style={{ color: 'gray', transform: 'translateY(2px)' }}
            />
          </Tooltip>
        </Badge>
      </Link>
      <Tooltip title="Edit">
        <button
          className="border-none cursor-pointer bg-transparent outline-none"
          onClick={handleEditClick}
        >
          <FiEdit3 size={16} style={{ color: 'blue' }} />
        </button>
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

export default JobAction;
