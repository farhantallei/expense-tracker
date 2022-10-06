import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormResetField } from 'react-hook-form';
import { createInAndOut } from '../services/inAndOut';

interface InputIncomeParams {
  year: number;
  month: number;
  week: number;
  onClose: () => void;
  resetField: UseFormResetField<{
    name: string;
    amount: number;
    description: string;
  }>;
}

function useInputIncome({
  year,
  month,
  week,
  onClose,
  resetField,
}: InputIncomeParams) {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInAndOut,
    onSuccess: () => {
      onClose();
      resetField('name');
      resetField('amount');
      resetField('description');
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

export default useInputIncome;
