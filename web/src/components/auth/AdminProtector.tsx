'use client';
import { AuthContext } from '@/contexts/auth/AuthProvider';
import { UserTypes } from '@/models/user';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useContext, useEffect } from 'react';
import Loading from '../common/Loading';

export interface IAdminProtectorProps extends PropsWithChildren {}
const AdminProtector: FC<IAdminProtectorProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user?.type || user.type !== UserTypes.System))
      router.replace('/');
  }, [loading, router, user?.type]);

  if (loading || (!loading && user?.type !== UserTypes.System))
    return <Loading />;
  return <>{children}</>;
};

export default AdminProtector;
