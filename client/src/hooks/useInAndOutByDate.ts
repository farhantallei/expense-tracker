import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getInAndOutByDate } from '../services/inAndOut';

function useInAndOutByDate(
  year: number,
  month: number,
  week: number,
  date: number
) {
  const { account } = useAuthContext();
  return useQuery({
    queryKey: ['in and out', { year, month, week }, date],
    queryFn: () =>
      getInAndOutByDate({ userId: account?.id, year, month, date }),
  });
}

export default useInAndOutByDate;
