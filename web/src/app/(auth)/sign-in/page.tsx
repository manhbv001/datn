import { SignInForm } from '@/components/auth/Forms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập - Techomies',
  description: 'Chào mừng bạn đến với Techomies',
};

async function SignIn() {
  return <SignInForm />;
}

export default SignIn;
