import fetcher from '@/libs/fetcher';
import {
  CreateJobPayload,
  JobModel,
  QueryJobParams,
  UpdateJobPayload,
} from '@/models/job.model';
import { toQueryParams } from '@/utils/queryParams';

export const jobServices = {
  query(params: QueryJobParams) {
    const query = toQueryParams(params);
    return fetcher.clientReq<{ jobs: JobModel[]; total: number }>(
      `jobs${query}`,
    );
  },

  queryByEnterprise(params: QueryJobParams) {
    const query = toQueryParams(params);
    return fetcher.clientReq<{ jobs: JobModel[]; total: number }>(
      `jobs/enterprise${query}`,
    );
  },

  findBySlug(slug: string) {
    return fetcher.serverReq<JobModel>(`jobs/${slug}`);
  },

  findById(id: number) {
    return fetcher.serverReq<JobModel>(`jobs/detail/${id}`);
  },

  save(id: number) {
    return fetcher.clientReq(`jobs/${id}/save`, {
      method: 'POST',
    });
  },

  getSaveStatus(id: number) {
    return fetcher.clientReq<{
      saved: boolean;
    }>(`jobs/save-status/${id}`);
  },

  getSavedJobs() {
    return fetcher.clientReq<JobModel[]>(`jobs/saved`);
  },

  createJob(payload: CreateJobPayload) {
    return fetcher.clientReq(`jobs`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  updateJob(id: number, payload: UpdateJobPayload) {
    return fetcher.clientReq(`jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  updateState(id: number, state: boolean) {
    return fetcher.clientReq(`jobs/${id}/state`, {
      method: 'PATCH',
      body: JSON.stringify({ state }),
    });
  },
};
