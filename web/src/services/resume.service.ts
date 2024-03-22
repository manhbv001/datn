import fetcher from '@/libs/fetcher';
import {
  CreateResumePayload,
  ResumeModel,
  ResumeTemplateModel,
  UpdateResumePayload,
} from '@/models/resume.model';

export const resumeService = {
  getTemplates() {
    return fetcher.serverReq<ResumeTemplateModel[]>(
      `metadata/resume-templates`,
    );
  },

  getTemplatesClient() {
    return fetcher.clientReq<ResumeTemplateModel[]>(
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

  update(id: number, payload: UpdateResumePayload) {
    return fetcher.clientReq<ResumeModel>(`resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  delete(id: number) {
    return fetcher.clientReq(`resumes/${id}`, { method: 'DELETE' });
  },
};
