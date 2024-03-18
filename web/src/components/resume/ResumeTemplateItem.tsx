import { ResumeTemplateModel } from '@/models/resume.model';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaRegEye } from 'react-icons/fa';
import { MdEditDocument } from 'react-icons/md';

export interface IResumeTemplateItemProps {
  data: ResumeTemplateModel;
}
const ResumeTemplateItem: FC<IResumeTemplateItemProps> = ({ data }) => {
  return (
    <div>
      <span className="font-semibold">{data.name}</span>
      <div className="group cursor-pointer aspect-[3/4] border rounded p-3 relative overflow-hidden">
        <div className="absolute left-0 top-0 right-0 bottom-0">
          <Image fill src={data.thumbnail} alt={data.name} />
        </div>
        <div className="hidden group-hover:block absolute left-0 top-0 right-0 bottom-0 bg-black opacity-50" />
        <div className="hidden group-hover:flex absolute left-0 top-0 right-0 bottom-0 flex-col gap-2 items-center justify-center">
          <Link
            href={`/resumes/${data.id}`}
            target="_blank"
            className="hover:opacity-75 min-w-[150px] flex gap-x-1 justify-center items-center px-3 py-2 text-white rounded-full bg-[var(--brown)]"
          >
            <MdEditDocument />
            Sử dụng mẫu
          </Link>
          <Link
            href={`resume-template-preview?url=${data.thumbnail}`}
            target="_blank"
            className="hover:opacity-75 min-w-[150px] flex gap-x-1 justify-center items-center px-3 py-2 text-white rounded-full bg-[var(--brown)]"
          >
            <FaRegEye />
            Xem trước
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateItem;
