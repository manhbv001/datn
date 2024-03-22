import { BaseModel } from './common';

export interface ResumeTemplateModel {
  id: number;
  name: string;
  thumbnail: string;
}

export interface ResumeModel extends BaseModel {
  name: string;
  template_id: string;
  information: string;
}

export interface CreateResumePayload {
  name: string;
  template_id: number;
  information: string;
}

export interface UpdateResumePayload {
  name: string;
  information: string;
}
