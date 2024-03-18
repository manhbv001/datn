import fetcher from '@/libs/fetcher';
import {
  OccupationModel,
  QueryOccupationsParams,
} from '@/models/occupation.model';
import { toQueryParams } from '@/utils/queryParams';

export const occupationService = {
  getAll(params: QueryOccupationsParams = {}) {
    const query = toQueryParams(params);

    return fetcher.clientReq<OccupationModel[]>(`occupations${query}`);
  },

  getByJobs(limit: number = 8) {
    return fetcher.serverReq<OccupationModel[]>(
      `occupations/jobs?limit=${limit}`,
    );
  },

  getByJobsClient(limit: number = 8) {
    return fetcher.clientReq<OccupationModel[]>(
      `occupations/jobs?limit=${limit}`,
    );
  },
};
