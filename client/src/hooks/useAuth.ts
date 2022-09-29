import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { AuthRequest, AuthResponse, login, register } from '../services/auth';

function useAuth(method: 'register' | 'login') {
  const { setIsAuthenticated, setAccount } = useAuthContext();
  const navigate = useNavigate();
  const toast = useToast();

  const mutationFn: Record<
    typeof method,
    (data: AuthRequest) => Promise<AuthResponse>
  > = {
    login,
    register,
  };

  return useMutation({
    mutationFn: mutationFn[method],
    onSuccess(data) {
      setAccount(data);
      setIsAuthenticated(true);
      navigate('/', { replace: true });
    },
    onError(error) {
      error instanceof Error &&
        toast({
          title: error.name,
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: false,
          position: 'bottom-right',
        });
    },
  });
}

export default useAuth;
