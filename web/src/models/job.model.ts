import {
  ApplicantLevel,
  BaseModel,
  BaseQueryParams,
  Gender,
  WorkArrangement,
} from './common';
import { EnterpriseModel } from './enterprise.model';
import { OccupationModel } from './occupation.model';
import { ProvinceModel } from './province.model';

export enum JobLevels {
  Internship = 'Internship',
  Fresher = 'Fresher',
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
  Expert = 'Expert',
  Manager = 'Manager',
  Chief = 'Chief',
}

export enum JobArrangements {
  Fulltime = 'Fulltime',
  Parttime = 'Parttime',
  Hybrid = 'Hybrid',
  Remote = 'Remote',
  Flex = 'Flex',
  Shift = 'Shift',
  Freelance = 'Freelance',
}

export enum JobStatus {
  Hiring = 'Hiring',
  Finished = 'Finished',
  Pending = 'Pending',
}

export interface JobModel extends BaseModel {
  title: string;
  description: string;
  benefit: string;
  requirement: string;
  work_place: string;
  work_time: string;
  salary_from: number;
  salary_to: number;
  headcount: number;
  level: JobLevels;
  arrangement: JobArrangements;
  province_id: number;
  occupation_id: number;
  slug: string;
  enterprise: EnterpriseModel;
  enterprise_id: number;
  province: ProvinceModel;
  occupation: OccupationModel;
  saved?: boolean;
  expired_date: string;
  status: JobStatus;
  salary: string;
  total_applicants?: number;
}

export interface QueryJobParams extends BaseQueryParams {
  occupation_id?: number;
  province_id?: number;
  enterprise_id?: number;
  level?: string;
  salary_range?: string;
  arrangement?: string;
  headline?: string;
  except_item?: number;
}

export interface CreateJobPayload {
  title: string;
  description: string;
  benefit: string;
  requirement: string;
  work_place: string;
  work_time: string;
  salary_from: number;
  salary_to: number;
  headcount: number;
  level: ApplicantLevel;
  gender: Gender;
  arrangement: WorkArrangement;
  expired_date: string;
  province_id: number;
  occupation_id: number;
}

export interface UpdateJobPayload extends CreateJobPayload {}
