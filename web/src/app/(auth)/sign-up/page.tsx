import { SignUpForm } from '@/components/auth/Forms';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Đăng ký - Techomies',
  description: 'Chào mừng bạn đến với Techomies',
};

export interface ISignUpProps {}
const SignUp: FC<ISignUpProps> = () => {
  return <SignUpForm />;
};

export default SignUp;
