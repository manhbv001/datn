'use client';

import { UserModel } from '@/models/user';
import authServices from '@/services/auth.service';
import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

export interface IAuthContext {
  user: UserModel | null;
  loading: boolean;
}
export const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
});

interface IAuthProvider extends PropsWithChildren {}
const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      authServices
        .verify()
        .then((response) => {
          if (response.success) {
            setUser(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log('Unauthorized');
    }
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ user, loading }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
