import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserTypes } from '../user/user.enum';
import {
  CreateEnterpriseDto,
  QueryEnterprisesDto,
  UpdateEnterpriseDto,
} from './enterprise.dto';
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

  @Put(':id')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() payload: UpdateEnterpriseDto) {
    return this.service.update(id, payload);
  }

  @Get(':slug')
  queryBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Get()
  query(@Query() query: QueryEnterprisesDto) {
    return this.service.query(query);
  }

  @Patch(':id/state')
  @Roles(UserTypes.System)
  @UseGuards(JwtAuthGuard)
  updateState(@Param('id') id: number, @Body('state') state: boolean) {
    return this.service.updateState(id, state);
  }
}
