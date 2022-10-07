import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getMonthlyBalance } from '../services/inAndOut';

function useMonthlyBalance(year: number, month: number) {
  const { account } = useAuthContext();

  return useQuery({
    queryKey: ['balance', { year, month }],
    queryFn: () => getMonthlyBalance({ userId: account?.id, year, month }),
  });
}

export default useMonthlyBalance;
