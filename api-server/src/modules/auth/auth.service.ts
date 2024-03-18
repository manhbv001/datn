import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuthProvider } from 'src/shared/enum/oauth-provider.enum';
import { Utils } from 'src/utils/data.util';
import { FindOptionsWhere, Repository } from 'typeorm';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { User } from '../user/user.entity';
import { UserTypes } from '../user/user.enum';
import { UserService } from '../user/user.service';
import {
  LoginDto,
  OAuthDto,
  RegisterDto,
  RegisterEnterpriseDto,
} from './auth.dto';

export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
    private enterpriseService: EnterpriseService
  ) {}

  public async validateUser(email: string, password: string) {
    const data = await this.userRepository.findOneOrFail({
      where: {
        email,
        deleted_at: null,
      },
    });
    const plainPassword = data && Utils.decodeString(data.password);
    return plainPassword === password ? data : null;
  }

  public async checkUserExist(id: number) {
    return await this.userRepository.findOneOrFail({
      where: {
        deleted_at: null,
        id,
      },
    });
  }

  public async login(payload: LoginDto) {
    const accessToken = this.jwtService.sign(payload);
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    return { accessToken, user };
  }

  public async register(payload: RegisterDto) {
    const newUser = await this.userService.createUser(payload);
    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
    });

    return accessToken;
  }

  public async registerEnterprise(payload: RegisterEnterpriseDto) {
    const newUser = await this.userService.createUser({
      email: payload.email,
      fullname: payload.fullname,
      password: payload.password,
      username: payload.username,
      type: UserTypes.Recruiter,
    });
    await this.enterpriseService.create(
      {
        address: payload.enterprise_address,
        name: payload.enterprise_name,
        description: '',
      },
      newUser.id
    );
    const accessToken = this.jwtService.sign({
      id: newUser.id,
      email: newUser.email,
    });

    return accessToken;
  }

  public async oauth(payload: OAuthDto) {
    const filters: FindOptionsWhere<User> = {};

    if (payload.provider === OAuthProvider.Google) {
      filters.email = payload.email;
    } else {
    }

    const isExisted = await this.userRepository.findOne({
      where: filters,
    });

    const isUpdated =
      isExisted?.fullname !== payload.fullname ||
      isExisted?.avatar_url !== payload.avatar_url;

    if (!isExisted || isUpdated) {
      const user = new User();
      user.id = isExisted?.id || undefined;
      user.email = payload.email;
      user.fullname = payload.fullname;
      user.avatar_url = payload.avatar_url;
      user.username = payload.username;

      return this.userRepository.save(user);
    }

    return isExisted;
  }

  public async me(userId: number) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id: userId,
      },
      relations: ['applicantProfile', 'enterprise'],
    });

    return user;
  }
}
