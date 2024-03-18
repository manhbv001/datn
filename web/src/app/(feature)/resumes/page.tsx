import ResumeTemplateItem from '@/components/resume/ResumeTemplateItem';
import { resumeService } from '@/services/resume.service';
import Link from 'next/link';
import { FC } from 'react';

export interface IResumePageProps {}
const ResumePage: FC<IResumePageProps> = async () => {
  const { data: resumeTemplates } = await resumeService.getTemplates();

  return (
    <div>
      <div className="bg-[var(--primary-color)] aspect-[4]">
        <div className="mx-auto container flex flex-col h-full items-center justify-center">
          <h1 className="text-white font-bold text-[3rem]">
            Tạo CV xin việc online MIỄN PHÍ
          </h1>
          <p className="mt-6 text-white text-[1.5rem]">
            Nhanh - Dễ dàng - Hiệu quả
          </p>
          <Link
            href="#resume-list"
            className="mt-4 bg-[var(--brown)] text-white py-4 px-12 rounded-full"
          >
            TẠO <strong>CV</strong> NGAY
          </Link>
        </div>
      </div>
      <div className="mx-auto container">
        <div id="resume-list" className="py-4">
          <ul className="grid grid-cols-4 gap-4">
            {resumeTemplates.map((item) => (
              <li key={item.id} className="col-span-1">
                <ResumeTemplateItem data={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
