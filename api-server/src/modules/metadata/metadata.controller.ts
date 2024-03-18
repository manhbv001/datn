import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';

@Controller('metadata')
@ApiTags('Metadata')
export class MetadataController {
  constructor(private service: MetadataService) {}

  @Get('roles')
  @ApiOperation({ summary: 'Danh sách roles' })
  roles() {
    return this.service.roles();
  }

  @Get('resume-templates')
  @ApiOperation({ summary: 'Danh sách mẫu CV' })
  resumeTemplates() {
    return this.service.resumeTemplates();
  }
}
