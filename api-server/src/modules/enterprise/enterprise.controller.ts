import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateEnterpriseDto, QueryEnterprisesDto } from './enterprise.dto';
import { EnterpriseService } from './enterprise.service';

@ApiTags('Enterprise')
@Controller('enterprises')
export class EnterpriseController {
  constructor(private readonly service: EnterpriseService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ])
  )
  @UseGuards(JwtAuthGuard)
  create(
    @Body() payload: CreateEnterpriseDto,
    @GetUser('id') id: number,
    @UploadedFiles()
    {
      logo,
      cover,
    }: { logo: Express.Multer.File[]; cover?: Express.Multer.File[] }
  ) {
    return this.service.create(payload, id, logo[0], cover[0]);
  }

  @Get(':slug')
  queryBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get()
  query(@Query() query: QueryEnterprisesDto) {
    return this.service.query(query);
  }
}
