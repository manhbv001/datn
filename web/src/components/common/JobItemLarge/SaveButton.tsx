'use client';
import { jobServices } from '@/services/job.service';
import { notification } from 'antd';
import { FC, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';

export interface ISaveButtonProps {
  jobId: number;
  saved: boolean;
}
const SaveButton: FC<ISaveButtonProps> = ({ saved, jobId }) => {
  const [saveStatus, setSaveStatus] = useState(saved);

  const handleSave = () => {
    jobServices.save(jobId).then((response) => {
      if (response.success) {
        setSaveStatus(true);
        notification.success({
          message: 'Thành công',
        });
      }
    });
  };

  return (
    <div className="text-gray-600 ml-auto">
      <button
        onClick={handleSave}
        disabled={saveStatus}
        className="inline-flex items-center text-[13px] ml-2 p-2 border rounded font-semibold"
      >
        <FaRegHeart color="var(--primary-color)" style={{ marginRight: 8 }} />
        {saveStatus ? 'Đã lưu' : 'Lưu công việc'}
      </button>
    </div>
  );
};

export default SaveButton;
