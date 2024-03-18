import ApplicantDetailInfor from '@/components/recruiter/applicant/DetailApplicant';
import { FC } from 'react';

export interface IApplicantDefaultPageProps {
  params: {
    id: string;
  };
}
const ApplicantDefaultPage: FC<IApplicantDefaultPageProps> = async ({
  params: { id },
}) => {
  return (
    <div>
      <ApplicantDetailInfor id={+id} />
    </div>
  );
};

export default ApplicantDefaultPage;
