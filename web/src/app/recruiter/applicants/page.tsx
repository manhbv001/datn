import ApplicantsTable from '@/components/recruiter/applicant/ApplicantTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ứng viên đã ứng tuyển - Techomies',
};

const ApplicantList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <ApplicantsTable />
    </main>
  );
};

export default ApplicantList;
