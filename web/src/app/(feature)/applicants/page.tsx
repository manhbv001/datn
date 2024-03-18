import ApplicantAdvanceSearch from '@/components/applicant/AdvanceSearch';
import JobItemLarge from '@/components/common/JobItemLarge';
import { JobModel } from '@/models/job.model';
import { jobServices } from '@/services/job.service';
import { FC } from 'react';

export interface IApplicantsPageProps {}
const ApplicantsPage: FC<IApplicantsPageProps> = async () => {
  const {
    data: { jobs },
  } = await jobServices.query({});

  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 gap-4 items-stretch">
          <div className="col-span-3">
            <div>
              <div className="p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
                <h3 className="text-xl">Danh sách ứng viên</h3>
              </div>

              <div className="bg-white grid grid-cols-1 gap-4 pt-2 py-2">
                {jobs.map((job: JobModel) => (
                  <JobItemLarge key={job.id} data={job} />
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div>
              <div className="p-3 text-white flex items-center justify-between bg-[var(--primary-color)]">
                <h3 className="text-xl">Tìm kiếm nâng cao</h3>
              </div>

              <div className="border rounded mt-2">
                <ApplicantAdvanceSearch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsPage;
