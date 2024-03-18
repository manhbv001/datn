import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GetUser } from 'src/decorators/user.decorator';
import { GoogleAuthGuard } from 'src/guards/google-auth.guard';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { User } from '../user/user.entity';
import { RegisterDto, RegisterEnterpriseDto, UiLoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Đăng nhập với Google' })
  loginWithGoogle() {
    return 'Loggin with google...';
  }

  @Get('google-auth/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google callback' })
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.login({
      id: (req.user as any).id,
      email: (req.user as any).email,
    });

    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });

    return res.redirect(process.env.CLIENT_DOMAIN);
  }

  @Get('admin-auth')
  @ApiOperation({ summary: 'Admin' })
  async loginAdmin(@Req() req: Request, @Res() res: Response) {
    res.cookie('accessToken', req.cookies.accessToken, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
    return res.redirect(process.env.ADMIN_DOMAIN);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Đăng nhập' })
  async login(
    @Req() req: Request,
    @Body() _: UiLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken, user } = await this.service.login({
      id: (req.user as any).id,
      email: (req.user as any).email,
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
    return user;
  }

  @Post('register/enterprise')
  @ApiOperation({ summary: 'Đăng ký doanh nghiệp' })
  async registerEnterprise(
    @Body() body: RegisterEnterpriseDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.service.registerEnterprise(body);
    res.cookie('accessToken', token, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
    return null;
  }

  @Post('register')
  @ApiOperation({ summary: 'Đăng ký' })
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.service.register({ ...body });
    res.cookie('accessToken', token, {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
    return null;
  }

  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Logout' })
  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      domain: process.env.DOMAIN,
    });
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Lấy thông tin tài khoản' })
  @Get('me')
  async profile(@GetUser() user: User) {
    return this.service.me(user.id);
  }
}
