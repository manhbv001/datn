import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { GetUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { UserTypes } from '../user/user.enum';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private service: StatsService) {}

  @Get('admin')
  @Roles(UserTypes.System)
  @UseGuards(JwtAuthGuard, RoleGuard)
  admin() {
    return this.service.admin();
  }

  @Get('recruiter')
  @Roles(UserTypes.Recruiter)
  @UseGuards(JwtAuthGuard, RoleGuard)
  recruiter(@GetUser('enterprise_id') enterpriseId: number) {
    return this.service.recruit(enterpriseId);
  }
}
