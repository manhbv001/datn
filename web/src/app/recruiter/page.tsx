import RecruiterOverall from '@/components/recruiter/Overall';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Quản lý công việc - Techomies',
};

export interface IRecruiterPageProps {}
const RecruiterPage: FC<IRecruiterPageProps> = () => {
  return (
    <div>
      <RecruiterOverall />
    </div>
  );
};

export default RecruiterPage;
