import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { OAuthProvider } from 'src/shared/enum/oauth-provider.enum';
import { OAuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.API_DOMAIN}/auth/google-auth/callback`,
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const googleUser = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    const payload: OAuthDto = {
      email: googleUser.email,
      username: googleUser.email.split('@')[0],
      fullname: `${googleUser.firstName} ${googleUser.lastName}`,
      provider: OAuthProvider.Google,
      avatar_url: googleUser.picture,
      password: undefined,
    };
    const user = await this.authService.oauth(payload);

    return user;
  }
}
