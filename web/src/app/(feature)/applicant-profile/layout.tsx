import ApplicantProfileSidebar from '@/components/applicant-profile/Sidebar';
import { FC, PropsWithChildren } from 'react';

export interface IApplicantProfileLayoutProps extends PropsWithChildren {}
const ApplicantProfileLayout: FC<IApplicantProfileLayoutProps> = ({
  children,
}) => {
  return (
    <div>
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-4 gap-2 items-stretch">
          <div className="col-span-1">
            <div className="bg-gray-50 rounded h-full overflow-hidden">
              <ApplicantProfileSidebar />
            </div>
          </div>
          <div className="col-span-3">
            <div className="bg-gray-50 rounded h-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfileLayout;
