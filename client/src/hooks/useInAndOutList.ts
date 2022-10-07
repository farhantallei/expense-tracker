import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { getInAndOutList } from '../services/inAndOut';

function useInAndOutList(
  totalDays: number,
  year: number,
  month: number,
  week: number
) {
  const { account } = useAuthContext();
  return useQuery({
    queryKey: ['in and out', { year, month, week }],
    queryFn: () =>
      getInAndOutList({ userId: account?.id, totalDays, year, month, week }),
  });
}

export default useInAndOutList;
