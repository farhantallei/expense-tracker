import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inputMonthlyBalance } from '../services/inAndOut';

interface InputMonthlyBalanceParams {
  year: number;
  month: number;
  onClose: () => void;
  resetField: () => void;
}

function useInputMonthlyBalance({
  year,
  month,
  onClose,
  resetField,
}: InputMonthlyBalanceParams) {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inputMonthlyBalance,
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
      return queryClient.invalidateQueries(['balance', { year, month }]);
    },
  });
}

export default useInputMonthlyBalance;
