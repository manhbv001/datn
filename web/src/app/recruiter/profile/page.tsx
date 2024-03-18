import RecruitForm from '@/components/recruiter/profile/RecruitProfile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thông tin doanh nghiệp',
};

const EnterpriseProfile = () => {
  return (
    <div className="">
      <RecruitForm />
    </div>
  );
};

export default EnterpriseProfile;
