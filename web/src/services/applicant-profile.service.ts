import fetcher from '@/libs/fetcher';
import {
  ApplicantProfileModel,
  CreateOrUpdateApplicantProfilePayload,
  QueryApplicantProfilesParams,
} from '@/models/applicant-profile.model';
import { toQueryParams } from '@/utils/queryParams';

export const applicantProfileService = {
  createOrUpdate(payload: CreateOrUpdateApplicantProfilePayload) {
    return fetcher.clientReq(`applicant-profiles`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getProfile() {
    return fetcher.clientReq<ApplicantProfileModel>(
      'applicant-profiles/profile',
    );
  },

  getOne(id: number) {
    return fetcher.clientReq<ApplicantProfileModel>(`applicant-profiles/${id}`);
  },

  query(params: QueryApplicantProfilesParams) {
    const query = toQueryParams(params);
    return fetcher.clientReq<{
      profiles: ApplicantProfileModel[];
      total: number;
    }>('applicant-profiles' + query);
  },
};
