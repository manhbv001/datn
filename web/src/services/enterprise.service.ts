import fetcher from '@/libs/fetcher';
import {
  EnterpriseModel,
  QueryEnterprisesParams,
} from '@/models/enterprise.model';
import { toQueryParams } from '@/utils/queryParams';

export const enterpriseService = {
  getAll(params: QueryEnterprisesParams = {}) {
    const query = toQueryParams(params);

    return fetcher.serverReq<{ enterprises: EnterpriseModel[]; total: number }>(
      `enterprises${query}`,
    );
  },

  getBySlug(slug: string) {
    return fetcher.serverReq<EnterpriseModel>(`enterprises/${slug}`);
  },
};
