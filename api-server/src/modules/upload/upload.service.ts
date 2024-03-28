import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    const filePath = file.path.replace('public', '');
    return { url: `${process.env.API_DOMAIN}${filePath}` };
  }
}
