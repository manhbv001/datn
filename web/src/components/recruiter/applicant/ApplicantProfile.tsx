'use client';

import { ApplicantProfileModel } from '@/models/applicant-profile.model';
import { applicantProfileService } from '@/services/applicant-profile.service';
import { formatNumberWithUnit } from '@/utils/number.util';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

export interface IApplicantProfileProps {
  id: number;
}
const ApplicantProfile: FC<IApplicantProfileProps> = ({ id }) => {
  const [data, setData] = useState<ApplicantProfileModel>();

  useEffect(() => {
    applicantProfileService.getOne(id).then((response) => {
      if (response.success) setData(response.data);
    });
  }, [id]);

  return (
    <div className="mx-auto flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold">{data?.display_name}</h1>
        <div className="flex gap-x-2 mt-4">
          <label className="text-lg opacity-75">Giới tính:</label>
          <p className="text-lg">{data?.gender}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Email:</label>
          <p className="text-lg">{data?.email}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Số điện thoại:</label>
          <p className="text-lg">{data?.phone}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Ngày sinh:</label>
          <p className="text-lg">
            {dayjs(data?.date_of_birth).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Trình độ:</label>
          <p className="text-lg">{data?.expect_level}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Học vấn:</label>
          <p className="text-lg">{data?.education}</p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Lĩnh vực:</label>
          <p className="text-lg">
            {data?.occupations.map((item) => item.name).join(', ')}
          </p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">Nơi làm việc:</label>
          <p className="text-lg">
            {data?.workProvinces.map((item) => item.name).join(', ')}
          </p>
        </div>
        <div className="flex gap-x-2 mt-3">
          <label className="text-lg opacity-75">
            Thu nhập mong muốn (/tháng):
          </label>
          <p className="text-lg">{`${formatNumberWithUnit(
            data?.salary_from || 0,
          )} - ${formatNumberWithUnit(data?.salary_to || 0)}`}</p>
        </div>
        <div className="mt-6 text-lg font-semibold">
          <h4>Liên hệ:</h4>
          <div className="mt-2 flex gap-x-2">
            <a
              href={`tel:${data?.phone}`}
              className="font-normal inline-flex items-center text-green gap-x-2 border border-green px-4 py-2 rounded"
            >
              <FaPhone color="green" />
              Gọi điện
            </a>
            <a
              href={`mailto:${data?.email}`}
              className="font-normal inline-flex items-center text-green gap-x-2 border border-green px-4 py-2 rounded"
            >
              <FaEnvelope color="#347ae3" />
              Gửi mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
