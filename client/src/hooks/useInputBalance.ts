import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseFormResetField } from 'react-hook-form';
import { BalanceResponse, inputBalance } from '../services/inAndOut';

interface InputBalanceParams {
  year: number;
  month: number;
  week: number;
  date: number;
  onClose: () => void;
  resetField: UseFormResetField<{ amount: number }>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function useInputBalance({
  year,
  month,
  week,
  date,
  onClose,
  resetField,
  setErrorMessage,
}: InputBalanceParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inputBalance,
    onMutate: async (newBalance) => {
      await queryClient.cancelQueries(['in and out', { year, month, week }]);
      const prevBalance = queryClient.getQueryData<BalanceResponse[]>([
        'in and out',
        { year, month, week },
      ]);

      queryClient.setQueryData<BalanceResponse[]>(
        ['in and out', { year, month, week }],
        (old) => {
          if (old == null) return;
          const idx = old.findIndex((item) => item.date === date);
          old[idx].amount = newBalance.amount;
          return old;
        }
      );

      return { prevBalance };
    },
    onSuccess: () => {
      onClose();
      resetField('amount');
    },
    onError: (error, newBalance, context) => {
      queryClient.setQueryData<BalanceResponse[]>(
        ['in and out', { year, month, week }],
        context?.prevBalance
      );
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'SomethingSomething goes wrong. Please refresh your page.'
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(['in and out', { year, month, week }]);
    },
  });
}

export default useInputBalance;
