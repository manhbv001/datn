import EnterprisesTable from '@/components/admin/enterprise/EnterpriseTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản lý doanh nghiệp - Techomies',
};

const EnterpriseList = () => {
  return (
    <main style={{ height: '100%', overflowY: 'auto' }}>
      <EnterprisesTable />
    </main>
  );
};

export default EnterpriseList;
