import { InjectRepository } from '@nestjs/typeorm';
import { UploadFolders } from 'src/shared/enum/upload-folders.enum';
import { AwsS3Service } from 'src/shared/services/aws-s3.service';
import { Utils } from 'src/utils/data.util';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateEnterpriseDto, QueryEnterprisesDto } from './enterprise.dto';
import { Enterprise } from './enterprise.entity';

export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise) private repository: Repository<Enterprise>,
    private readonly userService: UserService,
    private awsS3Service: AwsS3Service
  ) {}

  async create(
    payload: CreateEnterpriseDto,
    userId: number,
    logoFile?: Express.Multer.File,
    coverFile?: Express.Multer.File
  ) {
    const newEnterprise = new Enterprise();

    newEnterprise.address = payload.address;
    newEnterprise.description = payload.description;
    newEnterprise.name = payload.name;

    if (logoFile) {
      const rs = await this.awsS3Service.upload(
        logoFile,
        UploadFolders.Thumbnail
      );
      newEnterprise.logo = rs.Key;
    }

    if (coverFile) {
      const rs = await this.awsS3Service.upload(
        coverFile,
        UploadFolders.Thumbnail
      );
      newEnterprise.cover = rs.Key;
    }

    const record = await this.repository.save(newEnterprise);

    await this.userService.bindToEnterprise(userId, record.id);

    return record;
  }

  async query(payload: QueryEnterprisesDto) {
    const { where, skip, take } = Utils.parseQueryDto(payload);

    const [enterprises, total] = await this.repository.findAndCount({
      where,
      take,
      skip,
    });

    return { enterprises, total };
  }

  async findBySlug(slug: string) {
    return this.repository.findOne({
      where: {
        slug,
      },
    });
  }

  async updateState(id: number, state: boolean) {
    const enterprise = await this.repository.findOne({ where: { id } });

    if (!enterprise) {
      throw new Error('Enterprise not found');
    }

    enterprise.is_active = state;

    return this.repository.save(enterprise);
  }
}
