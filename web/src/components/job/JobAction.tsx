'use client';
import { JobModel } from '@/models/job.model';
import { applicantService } from '@/services/applicant.service';
import { jobServices } from '@/services/job.service';
import { notification } from 'antd';
import { FC, useEffect, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import ApplyModal from './ApplyModal';

export interface IJobActionsProps {
  job: JobModel;
}
const JobActions: FC<IJobActionsProps> = ({ job }) => {
  const [saveStatus, setSaveStatus] = useState(false);
  const [applyStatus, setApplyStatus] = useState(false);
  const [applyVisible, setApplyVisible] = useState(false);

  const handleApply = () => {
    setApplyVisible(true);
  };

  const handleSave = () => {
    jobServices.save(job.id).then((response) => {
      if (response.success) {
        setSaveStatus(true);
        notification.success({
          message: 'Thành công',
        });
      }
    });
  };

  const handleApplySuccess = () => {
    setApplyVisible(false);
    setApplyStatus(true);
  };

  useEffect(() => {
    applicantService.getApplyStatus(job.id).then((response) => {
      if (response.success) setApplyStatus(response.data.applied);
    });

    jobServices.getSaveStatus(job.id).then((response) => {
      if (response.success) setSaveStatus(response.data.saved);
    });
  }, [job.id]);

  return (
    <div>
      <ApplyModal
        job={job}
        visible={applyVisible}
        onCancel={() => setApplyVisible(false)}
        onSubmit={handleApplySuccess}
      />
      <div className="flex gap-x-2">
        <button
          disabled={saveStatus}
          onClick={handleSave}
          className="border rounded border-[var(--primary-color)] text-[var(--primary-color)] font-semibold px-3 py-2 flex items-center"
          style={{
            opacity: saveStatus ? 0.6 : 1,
          }}
        >
          <FaRegHeart color="var(--primary-color)" style={{ marginRight: 8 }} />
          {saveStatus ? 'Đã lưu' : 'Lưu công việc'}
        </button>
        <button
          disabled={applyStatus}
          onClick={handleApply}
          className="border rounded border-[var(--primary-color)] bg-[var(--primary-color)] text-white font-semibold px-3 py-2 flex items-center"
          style={{
            opacity: applyStatus ? 0.6 : 1,
          }}
        >
          <RiProfileLine color="white" style={{ marginRight: 8 }} />
          {applyStatus ? 'Đã ứng tuyển ' : 'Ứng tuyển ngay'}
        </button>
      </div>
    </div>
  );
};

export default JobActions;
