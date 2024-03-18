'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { Switch } from 'antd';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { FC, useContext } from 'react';
import { FaRegSave, FaRegUserCircle } from 'react-icons/fa';
import { GrDocumentDownload } from 'react-icons/gr';
import { MdOutlineDoneAll } from 'react-icons/md';

export interface IApplicantProfileSidebarProps {}
const ApplicantProfileSidebar: FC<IApplicantProfileSidebarProps> = () => {
  const { user } = useContext(AuthContext);
  const activeSegment = useSelectedLayoutSegment();

  return (
    <div>
      <div className="flex w-full justify-center pt-8">
        <div className="p-[2px] border-2 border-[var(--primary-color)] rounded-full max-w-[95%]">
          <img
            src={user?.avatar_url}
            alt={user?.fullname}
            className="w-[180px] rounded-full"
          />
        </div>
      </div>
      <div className="text-center mt-4">
        <span className="text-lg font-semibold">{user?.fullname}</span>
      </div>
      <div className="flex justify-around items-center mt-2">
        <span>Cho phép NTD tìm kiếm</span>
        <Switch style={{ backgroundColor: 'var(--primary-color)' }} />
      </div>
      <div className="mt-4">
        <ul>
          {/* <li>
            <Link
              href="/applicant-profile"
              className="flex items-center gap-x-3 px-4 py-3 border-b"
              style={{ color: !activeSegment ? 'var(--primary-color)' : '' }}
            >
              <IoIosStats />
              Quản lý chung
            </Link>
          </li> */}
          <li>
            <Link
              href="/applicant-profile/profile"
              className="flex items-center gap-x-3 px-4 py-3 border-b"
              style={{
                color:
                  activeSegment === 'profile' ? 'var(--primary-color)' : '',
              }}
            >
              <FaRegUserCircle />
              Quản lý hồ sơ
            </Link>
          </li>
          <li>
            <Link
              href="/applicant-profile/resumes"
              className="flex items-center gap-x-3 px-4 py-3 border-b"
              style={{
                color:
                  activeSegment === 'resumes' ? 'var(--primary-color)' : '',
              }}
            >
              <GrDocumentDownload />
              Quản lý CV
            </Link>
          </li>
          {/* <li>
            <Link
              href="/applicant-profile/cover-letters"
              className="flex items-center gap-x-3 px-4 py-3 border-b"
              style={{
                color:
                  activeSegment === 'cover-letters'
                    ? 'var(--primary-color)'
                    : '',
              }}
            >
              <TiDocumentText />
              Quản lý Cover letter
            </Link>
          </li> */}
          <li>
            <Link
              href="/applicant-profile/applied-jobs"
              className="flex items-center gap-x-3 px-4 py-3 border-b"
              style={{
                color:
                  activeSegment === 'applied-jobs'
                    ? 'var(--primary-color)'
                    : '',
              }}
            >
              <MdOutlineDoneAll />
              Việc làm đã ứng tuyển
            </Link>
          </li>
          <li>
            <Link
              href="/applicant-profile/saved-jobs"
              className="flex items-center gap-x-3 px-4 py-3 border-b"
              style={{
                color:
                  activeSegment === 'saved-jobs' ? 'var(--primary-color)' : '',
              }}
            >
              <FaRegSave />
              Việc làm đã lưu
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApplicantProfileSidebar;
