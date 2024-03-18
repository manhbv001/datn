import fetcher from '@/libs/fetcher';
import {
  CreateResumePayload,
  ResumeModel,
  ResumeTemplateModel,
} from '@/models/resume.model';

export const resumeService = {
  getTemplates() {
    return fetcher.serverReq<ResumeTemplateModel[]>(
      `metadata/resume-templates`,
    );
  },

  queryByUser() {
    return fetcher.clientReq<ResumeModel[]>(`resumes/user`);
  },

  getOne(id: number) {
    return fetcher.clientReq<ResumeModel>(`resumes/${id}`);
  },

  create(payload: CreateResumePayload) {
    return fetcher.clientReq<ResumeModel>(`resumes`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
