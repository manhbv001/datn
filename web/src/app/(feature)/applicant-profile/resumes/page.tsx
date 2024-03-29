'use client';
import { ResumeModel } from '@/models/resume.model';
import { resumeService } from '@/services/resume.service';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { Popconfirm } from 'antd';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FaCopy, FaEye } from 'react-icons/fa';

export interface IResumesProps {}
const Resumes: FC<IResumesProps> = () => {
  const [resumes, setResumes] = useState<ResumeModel[]>([]);

  useEffect(() => {
    document.title = 'Danh sách CV';

    resumeService.queryByUser().then((response) => {
      if (response.success) setResumes(response.data);
    });
  }, []);

  return (
    <div className="p-3">
      <h3 className="font-semibold text-lg pl-4 pt-3">Danh sách CV của bạn</h3>
      {(resumes.length === 0 && (
        <div className="text-center mt-4">
          <span>Bạn chưa tạo CV nào</span>
        </div>
      )) || (
        <ul className="mt-4">
          <li className="py-2 rounded border-b">
            <div className="grid grid-cols-4">
              <div className="text-center col-span-1">
                <span className="text-[var(--primary-color)] font-semibold">
                  Tên CV
                </span>
              </div>

              <div className="text-center col-span-1">
                <span className="text-[var(--primary-color)] font-semibold">
                  Xem trước
                </span>
              </div>
              <div className="text-center col-span-1">
                <span className="text-[var(--primary-color)] font-semibold">
                  Chia sẻ
                </span>
              </div>
              <div className="text-center col-span-1">
                <span className="text-[var(--primary-color)] font-semibold"></span>
              </div>
            </div>
          </li>
          {resumes.map((item) => (
            <li key={`saved_job_${item.id}`} className="py-2 border-b">
              <div className="grid grid-cols-4 items-center">
                <div className="text-center col-span-1">
                  <span className="block">{item.name}</span>
                </div>
                <div className="text-center col-span-1">
                  <Link
                    href={`/resumes/${item.template_id}/${item.id}`}
                    target="_blank"
                    className="flex justify-center"
                  >
                    <FaEye />
                  </Link>
                </div>
                <div className="text-center col-span-1">
                  <span
                    onClick={() =>
                      copyToClipboard(
                        `${window.location.origin}/resumes/${item.template_id}/${item.id}`,
                      )
                    }
                    className="flex justify-center cursor-pointer"
                  >
                    <FaCopy />
                  </span>
                </div>
                <div className="text-center col-span-1">
                  <div className="flex justify-end">
                    <Link href={`/resumes/${item.id}/edit`}>
                      <span className="text-[var(--primary-color)]">
                        Chỉnh sửa
                      </span>
                    </Link>
                    <span className="mx-2">|</span>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={() => {
                        resumeService.delete(item.id).then((response) => {
                          if (response.success) {
                            setResumes(resumes.filter((i) => i.id !== item.id));
                          }
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                      color="white"
                    >
                      <span className="text-[var(--primary-color)] cursor-pointer">
                        Xóa
                      </span>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Resumes;
