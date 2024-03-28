import { InjectRepository } from '@nestjs/typeorm';
import { Utils } from 'src/utils/data.util';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { OccupationService } from '../occupation/occupation.service';
import { ProvinceService } from '../province/province.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import {
  CreateApplicantProfileDto,
  QueryApplicantProfilesDto,
} from './applicant-profile.dto';
import { ApplicantProfile } from './applicant-profile.entity';

export class ApplicantProfileService {
  constructor(
    @InjectRepository(ApplicantProfile)
    private readonly repository: Repository<ApplicantProfile>,
    private readonly userService: UserService,
    private readonly occupationService: OccupationService,
    private readonly provinceService: ProvinceService
  ) {}

  async createOrUpdate(payload: CreateApplicantProfileDto, userId: number) {
    const occupations = await this.occupationService.getByIds(
      payload.occupation_ids
    );
    const provinces = await this.provinceService.getByIds(
      payload.work_province_ids
    );
    const existed = await this.repository.findOneBy({ user_id: userId });

    const newProfile = new ApplicantProfile();

    if (existed) newProfile.id = existed.id;
    newProfile.user_id = userId;
    newProfile.display_name = payload.display_name;
    newProfile.email = payload.email;
    newProfile.phone = payload.phone;
    newProfile.level = payload.level;
    newProfile.education = payload.education;
    newProfile.date_of_birth = payload.date_of_birth;
    newProfile.province_id = payload.province_id;
    newProfile.gender = payload.gender;
    newProfile.work_arrangement = payload.work_arrangement;
    newProfile.salary_from = payload.salary_from;
    newProfile.salary_to = payload.salary_to;
    newProfile.expect_level = payload.expect_level;
    newProfile.occupations = occupations;
    newProfile.workProvinces = provinces;
    const record = await this.repository.save(newProfile);

    if (!existed)
      await this.userService.setApplicantProfile(newProfile.user_id, record.id);

    return record;
  }

  findById(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  getProfile(userId: number) {
    return this.repository.findOne({
      where: {
        user_id: userId,
      },
      relations: ['workProvinces', 'occupations'],
    });
  }

  async query(params: QueryApplicantProfilesDto) {
    const { where, skip, take } = Utils.parseQueryDto(params);
    const queryParams = { ...where };

    if (queryParams.salary) {
      const [salary_from, salary_to] = where.salary?.split('-');
      queryParams['salary_from'] = MoreThanOrEqual(+salary_from);
      queryParams['salary_to'] = LessThanOrEqual(+salary_to);
      delete queryParams['salary'];
    }

    if (queryParams.occupation_ids) {
      queryParams.occupations = {
        id: In(queryParams.occupation_ids.split(',')),
      };
      delete queryParams.occupation_ids;
    }

    const [rs, count] = await this.repository.findAndCount({
      where: {
        ...queryParams,
        finding_job: true,
      },
      relations: ['workProvinces', 'occupations', 'province'],
      skip,
      take,
    });

    return {
      profiles: rs,
      total: count,
    };
  }

  getDetailProfile(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      relations: ['occupations', 'workProvinces'],
    });
  }

  toggleFindingJob(status: boolean, user: User) {
    return this.repository.update(
      { id: user.applicant_profile_id },
      {
        finding_job: status,
      }
    );
  }

  updateState(id: number, state: boolean) {
    return this.repository.update(
      { id },
      {
        is_active: state,
      }
    );
  }
}
