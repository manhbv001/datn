'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { UserTypes } from '@/models/user';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useContext, useEffect } from 'react';
import Loading from '../common/Loading';

export interface IRecruiterProtectorProps extends PropsWithChildren {}
const RecruiterProtector: FC<IRecruiterProtectorProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user?.type || user.type !== UserTypes.Recruiter))
      router.replace('/');
  }, [loading, router, user?.type]);

  if (loading || (!loading && user?.type !== UserTypes.Recruiter))
    return <Loading />;
  return <>{children}</>;
};

export default RecruiterProtector;
