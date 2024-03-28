import fetcher from '@/libs/fetcher';
import {
  EnterpriseModel,
  QueryEnterprisesParams,
  UpdateEnterisePayload,
} from '@/models/enterprise.model';
import { toQueryParams } from '@/utils/queryParams';

export const enterpriseService = {
  getAll(params: QueryEnterprisesParams = {}) {
    const query = toQueryParams(params);

    return fetcher.serverReq<{ enterprises: EnterpriseModel[]; total: number }>(
      `enterprises${query}`,
    );
  },

  query(params: QueryEnterprisesParams = {}) {
    const query = toQueryParams(params);

    return fetcher.clientReq<{ enterprises: EnterpriseModel[]; total: number }>(
      `enterprises${query}`,
    );
  },

  getBySlug(slug: string) {
    return fetcher.serverReq<EnterpriseModel>(`enterprises/${slug}`);
  },

  updateState(id: number, isActive: boolean) {
    return fetcher.clientReq<{ success: boolean }>(`enterprises/${id}/state`, {
      method: 'PATCH',
      body: JSON.stringify({ isActive }),
    });
  },

  update(id: number, payload: UpdateEnterisePayload) {
    return fetcher.clientReq<EnterpriseModel>(`enterprises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },
};
