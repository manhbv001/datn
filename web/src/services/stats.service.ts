import fetcher from '@/libs/fetcher';
import { ProvinceModel } from '@/models/province.model';
import { AdminStats, RecruiterStats } from '@/models/stats.model';

export const statsServices = {
  admin() {
    return fetcher.clientReq<AdminStats>(`stats/admin`);
  },

  recruiter() {
    return fetcher.clientReq<RecruiterStats>(`stats/recruiter`);
  },

  getByJobs() {
    return fetcher.serverReq<ProvinceModel[]>(`provinces/jobs?limit=63`);
  },

  getByJobsClient(limit: number = 63) {
    return fetcher.clientReq<ProvinceModel[]>(`provinces/jobs?limit=${limit}`);
  },
};
