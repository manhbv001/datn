import fetcher from '@/libs/fetcher';
import {
  ApplicantModel,
  ApplicantStatus,
  ApplyJobPayload,
  QueryApplicantsParams,
} from '@/models/applicant.model';
import { JobModel } from '@/models/job.model';
import { toQueryParams } from '@/utils/queryParams';

export const applicantService = {
  getAppliedJobs() {
    return fetcher.clientReq<{
      appliedJobs: (JobModel & { applyTime: string })[];
      total: number;
    }>('applicants/applied-jobs');
  },

  getApplyStatus(jobId: number) {
    return fetcher.clientReq<{
      applied: boolean;
    }>(`applicants/apply-status/${jobId}`);
  },

  applyJob(payload: ApplyJobPayload) {
    return fetcher.clientReq('applicants', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getByEnterprise(params: QueryApplicantsParams) {
    const query = toQueryParams(params);
    return fetcher.clientReq<{ applicants: ApplicantModel[]; total: number }>(
      `applicants/enterprise${query}`,
    );
  },

  getDetail(id: number) {
    return fetcher.clientReq<ApplicantModel>(`applicants/${id}`);
  },

  updateStatus(id: number, status: ApplicantStatus) {
    return fetcher.clientReq<ApplicantModel>(`applicants/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
      }),
    });
  },
};
