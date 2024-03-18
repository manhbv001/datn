import OpenApplicantsTable from '@/components/recruiter/applicant/OpenApplicantTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ứng viên đang tìm việc - Techomies',
};

const ApplicantList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <OpenApplicantsTable />
    </main>
  );
};

export default ApplicantList;
