import { BaseModel } from './common';

export interface ProvinceModel extends BaseModel {
  name: string;
  totalJobs?: number;
}
