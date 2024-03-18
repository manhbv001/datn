import ApplicantProfile from '@/components/recruiter/applicant/ApplicantProfile';
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
      <ApplicantProfile id={+id} />
    </div>
  );
};

export default ApplicantDefaultPage;
