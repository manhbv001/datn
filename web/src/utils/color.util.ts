import { ApplicantStatus } from '@/models/applicant.model';
import { JobStatus } from '@/models/job.model';

export const ColorUtils = {
  applicantStatus: {
    [ApplicantStatus.Processing]: 'gray',
    [ApplicantStatus.Scheduled]: 'orange',
    [ApplicantStatus.Interviewed]: 'blue',
    [ApplicantStatus.Passed]: 'green',
    [ApplicantStatus.Rejected]: 'red',
  },
  jobStatus: {
    [JobStatus.Finished]: 'gray',
    [JobStatus.Hiring]: 'green',
    [JobStatus.Pending]: 'orange',
  },
};
