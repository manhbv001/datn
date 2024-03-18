import { BaseModel, BaseQueryParams } from './common';

export interface QueryEnterprisesParams extends BaseQueryParams {}

export interface EnterpriseModel extends BaseModel {
  name: string;
  logo: string;
  cover: string;
  address: string;
  description: string;
  slug: string;
}
