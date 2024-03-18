import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { OAuthProvider } from 'src/shared/enum/oauth-provider.enum';
import { CreateUserDto } from '../user/user.dto';

export class LoginDto {
  @IsString()
  id: number;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  expires_in?: number | string;
}

export class UiLoginDto {
  @IsString()
  @ApiProperty({ description: 'mật khẩu' })
  password: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @ApiProperty({ description: 'email' })
  email: string;
}

export class RegisterDto extends CreateUserDto {}

export class RegisterEnterpriseDto extends RegisterDto {
  @IsString()
  @ApiProperty()
  enterprise_name: string;

  @IsString()
  @ApiProperty()
  enterprise_address: string;
}

export class OAuthDto extends RegisterDto {
  @IsEnum(OAuthProvider)
  @ApiProperty()
  provider: OAuthProvider;

  @IsOptional()
  avatar_url: string;

  @IsOptional()
  password: string;
}
