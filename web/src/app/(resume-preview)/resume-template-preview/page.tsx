'use client';
import useQueryParams from '@/hooks/useQueryParams';
import { FC } from 'react';
import '../../globals.css';

export interface IResumeTemplatePreviewProps {}
const ResumeTemplatePreview: FC<IResumeTemplatePreviewProps> = () => {
  const { queryParams } = useQueryParams<{ url: string }>();
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <img
            src={queryParams.url}
            className="w-auto h-[100vh]"
            alt="preview template"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplatePreview;
