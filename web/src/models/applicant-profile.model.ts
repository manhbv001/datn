import {
  ApplicantLevel,
  BaseModel,
  BaseQueryParams,
  Education,
  Gender,
  WorkArrangement,
} from './common';
import { OccupationModel } from './occupation.model';
import { ProvinceModel } from './province.model';
import { UserModel } from './user';

export interface ApplicantProfileModel extends BaseModel {
  user_id: number;
  display_name: string;
  email: string;
  phone: string;
  level: ApplicantLevel;
  education: Education;
  date_of_birth: string;
  province_id: number;
  gender: Gender;
  work_arrangement: WorkArrangement;
  salary_from: number;
  salary_to: number;
  expect_level: ApplicantLevel;
  finding_job: boolean;
  occupations: OccupationModel[];
  workProvinces: ProvinceModel[];
  province: ProvinceModel;
  user: UserModel;
}

export interface CreateOrUpdateApplicantProfilePayload {
  display_name: string;
  email: string;
  phone: string;
  level: ApplicantLevel;
  education: Education;
  date_of_birth: string;
  province_id: number;
  gender: Gender;
  work_arrangement: WorkArrangement;
  salary_from: number;
  salary_to: number;
  expect_level: ApplicantLevel;
  occupation_ids: number[];
  work_province_ids: number[];
}

export interface QueryApplicantProfilesParams extends BaseQueryParams {}
