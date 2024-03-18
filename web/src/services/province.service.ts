import fetcher from '@/libs/fetcher';
import { ProvinceModel } from '@/models/province.model';
import { toQueryParams } from '@/utils/queryParams';

export const provinceService = {
  getAll() {
    const query = toQueryParams({});

    return fetcher.clientReq<ProvinceModel[]>(`provinces${query}`);
  },

  getByJobs() {
    return fetcher.serverReq<ProvinceModel[]>(`provinces/jobs?limit=63`);
  },

  getByJobsClient(limit: number = 63) {
    return fetcher.clientReq<ProvinceModel[]>(`provinces/jobs?limit=${limit}`);
  },
};
