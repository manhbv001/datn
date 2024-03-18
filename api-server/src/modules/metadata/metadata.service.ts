import { RESUME_TEMPLATES } from 'src/constants/resume.constant';
import rolesConstant from 'src/constants/roles.constant';

export class MetadataService {
  roles() {
    return rolesConstant;
  }

  resumeTemplates() {
    return RESUME_TEMPLATES;
  }
}
