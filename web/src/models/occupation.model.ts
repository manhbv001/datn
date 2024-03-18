import { BaseModel, BaseQueryParams } from './common';

export interface OccupationModel extends BaseModel {
  name: string;
  totalJobs?: number;
}

export interface QueryOccupationsParams extends BaseQueryParams {}
