import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks';
import { AuthResponse, verify as verifyFn } from '../services/auth';

interface AuthContextValue {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  account: AuthResponse | null;
  setAccount: React.Dispatch<React.SetStateAction<AuthResponse | null>>;
}

const AuthContext = createContext<AuthContextValue>(null!);

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children?: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [account, setAccount] = useLocalStorage<AuthResponse | null>(
    'expensetracker.user-id',
    null
  );

  const { mutate: verify } = useMutation({
    mutationFn: verifyFn,
    onSuccess() {
      setIsAuthenticated(true);
    },
    onError() {
      setAccount(null);
      setIsAuthenticated(false);
    },
  });

  useEffect(() => {
    if (account == null) return setIsAuthenticated(false);
    verify({ id: account.id });
  }, []);

  const value: AuthContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    account,
    setAccount,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
