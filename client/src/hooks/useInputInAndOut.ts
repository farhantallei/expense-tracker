import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInAndOut } from '../services/inAndOut';

interface InputInAndOutParams {
  year: number;
  month: number;
  week: number;
  onClose: () => void;
  resetField: () => void;
}

function useInputInAndOut({
  year,
  month,
  week,
  onClose,
  resetField,
}: InputInAndOutParams) {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInAndOut,
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

export default useInputInAndOut;
