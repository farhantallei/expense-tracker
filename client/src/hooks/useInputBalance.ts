import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inputBalance } from '../services/inAndOut';

interface InputBalanceParams {
  year: number;
  month: number;
  week: number;
  onClose: () => void;
  resetField: () => void;
}

function useInputBalance({
  year,
  month,
  week,
  onClose,
  resetField,
}: InputBalanceParams) {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inputBalance,
    onSuccess: () => {
      onClose();
      resetField();
    },
    onError: (error) => {
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
    onSettled: () => {
      queryClient.invalidateQueries(['in and out', { year, month, week }]);
    },
  });
}

export default useInputBalance;
