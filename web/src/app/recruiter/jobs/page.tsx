import JobsTable from '@/components/recruiter/job/JobTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý công việc - Techomies',
};

const JobList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <JobsTable />
    </main>
  );
};

export default JobList;
