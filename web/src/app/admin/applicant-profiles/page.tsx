import ApplicantProfileTable from '@/components/admin/applicant-profile/ApplicantProfileTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý ứng viên - Techomies',
};

const ApplicantProfileList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <ApplicantProfileTable />
    </main>
  );
};

export default ApplicantProfileList;
