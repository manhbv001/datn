import { ApplicantProfileModel } from './applicant-profile.model';
import { BaseModel } from './common';
import { EnterpriseModel } from './enterprise.model';

export enum UserTypes {
  System = 1,
  Member = 2,
  Recruiter = 3,
  Applicant = 4,
}

export interface UserModel extends BaseModel {
  fullname: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  type: UserTypes;
  is_super: boolean;
  avatar_url: string;
  post_count: number;
  follower_count: number;
  followings_count: number;
  like_count: number;
  view_count: number;
  followed: number;
  applicantProfile?: ApplicantProfileModel;
  enterprise?: EnterpriseModel;
  enterprise_id?: number;
}

export interface RegisterPayload {
  username: string;
  email: string;
  fullname: string;
  password: string;
}
export interface UpdateAccountPayload {
  fullname: string;
  username: string;
  avatar?: File;
}
