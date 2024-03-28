import fetcher from '@/libs/fetcher';
import { OAuthProviders } from '@/models/common';
import { UserModel } from '@/models/user';

export interface ILoginPayload {
  email: string;
  password: string;
}
export type ILoginResponse = UserModel;
export interface IOAuthPayload extends Omit<RegisterPayload, 'password'> {
  provider: OAuthProviders;
  expire_time?: string | number;
}

export interface RegisterPayload {
  username: string;
  email: string;
  fullname: string;
  password: string;
}

export interface RegisterEnterprisePayload extends RegisterPayload {
  enterprise_name: string;
  enterprise_address: string;
}

const authServices = {
  login(payload: ILoginPayload) {
    return fetcher.clientReq<ILoginResponse>('auth/login', {
      body: JSON.stringify(payload),
      method: 'post',
    });
  },
  logout() {
    return fetcher.clientReq('auth/logout');
  },
  verify() {
    return fetcher.clientReq<UserModel>('auth/me');
  },
  register(payload: RegisterPayload) {
    return fetcher.clientReq('auth/register', {
      body: JSON.stringify(payload),
      method: 'post',
    });
  },
  registerEnterprise(payload: RegisterEnterprisePayload) {
    return fetcher.clientReq('auth/register/enterprise', {
      body: JSON.stringify(payload),
      method: 'post',
    });
  },
  resetPassword(email: string) {
    return fetcher.clientReq<{ email: string }>(
      'auth/reset-password?email=' + email,
    );
  },
};

export default authServices;
