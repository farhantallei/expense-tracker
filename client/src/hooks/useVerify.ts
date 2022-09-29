import { useMutation } from '@tanstack/react-query';
import { verify } from '../services/auth';

function useVerify({
  setIsAuthenticated,
}: {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}) {
  return useMutation({
    mutationFn: verify,
    onSuccess() {
      setIsAuthenticated(true);
    },
    onError() {
      setIsAuthenticated(false);
    },
  });
}

export default useVerify;
