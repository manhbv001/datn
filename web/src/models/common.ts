import { UserTypes } from './user';

export interface BaseModel {
  id: number;
  is_active?: boolean;
  created_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  statusCode: number;
  message: string;
}

export enum OAuthProviders {
  Google = 1,
  Facebook = 2,
}

export type SortBy = 'DESC' | 'ESC';

export interface BaseQueryParams {
  page?: number;
  size?: number;
  search?: string;
  order_key?: string;
  order_by?: SortBy;
  start_date?: string;
  end_date?: string;
}

export interface HeaderMenuItemProps {
  label: string;
  path: string;
  target: string | null;
  userType?: UserTypes;
  subItems?: HeaderMenuItemProps[];
}

export enum ApplicantLevel {
  Internship = 'Internship',
  Fresher = 'Fresher',
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
  Expert = 'Expert',
  Manager = 'Manager',
  Chief = 'Chief',
}

export enum Education {
  Unskill = 'Unskill',
  Junior = 'Junior',
  Intermediate = 'Intermediate',
  College = 'College',
  Bachelor = 'Bachelor',
  Engineer = 'Engineer',
  Master = 'Master',
  PhD = 'PhD',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum WorkArrangement {
  Fulltime = 'Fulltime',
  Parttime = 'Parttime',
  Hybrid = 'Hybrid',
  Remote = 'Remote',
  Flex = 'Flex',
  Shift = 'Shift',
  Freelance = 'Freelance',
}
