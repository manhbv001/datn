'use client';

import Loading from '@/components/common/Loading';
import { ApplicantModel, ApplicantStatus } from '@/models/applicant.model';
import { applicantService } from '@/services/applicant.service';
import { formatNumberWithUnit } from '@/utils/number.util';
import { Select, notification } from 'antd';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

export interface IApplicantDetailInforProps {
  id: number;
}
const ApplicantDetailInfor: FC<IApplicantDetailInforProps> = ({ id }) => {
  const [data, setData] = useState<ApplicantModel>();

  const handleUpdateStatus = (value: ApplicantStatus) => {
    applicantService.updateStatus(id, value).then((response) => {
      if (response.success) {
        notification.success({
          message: 'Thành công',
        });
      }
    });
  };

  useEffect(() => {
    applicantService.getDetail(id).then((response) => {
      if (response.success) setData(response.data);
    });
  }, [id]);

  if (!data) return <Loading />;

  return (
    <div className="mx-auto flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold">
          {data?.applicant_profile.display_name}
        </h1>
        <div className="flex gap-x-2 mt-4">
          <label className="text-lg opacity-75">Giới tính:</label>
          <p className="text-lg">{data?.applicant_profile.gender}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Email:</label>
          <p className="text-lg">{data?.applicant_profile.email}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Số điện thoại:</label>
          <p className="text-lg">{data?.applicant_profile.phone}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Ngày sinh:</label>
          <p className="text-lg">
            {dayjs(data?.applicant_profile.date_of_birth).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Trình độ:</label>
          <p className="text-lg">{data?.applicant_profile.expect_level}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Học vấn:</label>
          <p className="text-lg">{data?.applicant_profile.education}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">
            Thu nhập mong muốn (/tháng):
          </label>
          <p className="text-lg">{`${formatNumberWithUnit(
            data?.applicant_profile.salary_from || 0,
          )} - ${formatNumberWithUnit(
            data?.applicant_profile.salary_to || 0,
          )}`}</p>
        </div>
        <div className="mt-3">
          <label className="text-lg opacity-75">Thư xin việc:</label>
          <p className="mt-1 italic opacity-75 pr-4">{data?.cover_letter}</p>
        </div>
        <div className="mt-6 text-lg font-semibold">
          <h4>Liên hệ:</h4>
          <div className="mt-2 flex gap-x-2">
            <a
              href={`tel:${data?.applicant_profile.phone}`}
              className="font-normal inline-flex items-center text-green gap-x-2 border border-green px-4 py-2 rounded"
            >
              <FaPhone color="green" />
              Gọi điện
            </a>
            <a
              href={`mailto:${data?.applicant_profile.email}`}
              className="font-normal inline-flex items-center text-green gap-x-2 border border-green px-4 py-2 rounded"
            >
              <FaEnvelope color="#347ae3" />
              Gửi mail
            </a>
          </div>
        </div>
        <div className="mt-6 text-lg font-semibold">
          <h4>Cập nhật trạng thái</h4>
          <div className="mt-2 flex gap-x-2">
            <Select
              size="large"
              style={{
                width: 200,
              }}
              onChange={handleUpdateStatus}
              defaultValue={data?.status}
              options={Object.values(ApplicantStatus).map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailInfor;
