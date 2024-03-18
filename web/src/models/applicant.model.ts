import { ApplicantProfileModel } from './applicant-profile.model';
import { BaseModel, BaseQueryParams } from './common';
import { JobModel } from './job.model';

export interface ApplicantModel extends BaseModel {
  job_id: number;
  applicant_profile_id: number;
  resume_id: number;
  cover_letter?: string;
  job: JobModel;
  applicant_profile: ApplicantProfileModel;
  status: ApplicantStatus;
}

export interface ApplyJobPayload {
  job_id: number;
  resume_id?: number;
  cover_letter?: string;
}

export enum ApplicantStatus {
  Processing = 'Processing',
  Scheduled = 'Scheduled',
  Interviewed = 'Interviewed',
  Passed = 'Passed',
  Rejected = 'Rejected',
}

export interface QueryApplicantsParams extends BaseQueryParams {
  job_id?: number;
}
