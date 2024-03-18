'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useContext, useEffect } from 'react';

export interface IHomeProtecterProps extends PropsWithChildren {}
const HomeProtecter: FC<IHomeProtecterProps> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router, user?.type]);

  return <>{children}</>;
};

export default HomeProtecter;
