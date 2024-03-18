import { JobArrangements, JobLevels } from '@/models/job.model';

export const JOB_LEVELS = Object.values(JobLevels);
export const JOB_ARRANGEMENTS = Object.values(JobArrangements);
export const SALARY_RANGES = [
  {
    from: 5_000_000,
    to: 10_000_000,
  },
  {
    from: 10_000_000,
    to: 20_000_000,
  },
  {
    from: 20_000_000,
    to: 30_000_000,
  },
  {
    from: 30_000_000,
    to: 50_000_000,
  },
  {
    from: 50_000_000,
    to: 100_000_000,
  },
];
