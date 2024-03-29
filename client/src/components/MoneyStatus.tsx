import {
  Skeleton,
  Stat,
  StatLabel,
  StatNumber,
  useMediaQuery,
} from '@chakra-ui/react';
import { formatCurrency } from '../utils';

interface MoneyStatusProps {
  date?: number;
  monthlyBalance: number;
  balance: number;
  loss: number;
  income: number;
  expense: number;
  isLoading?: boolean;
}

function MoneyStatus({
  date,
  monthlyBalance,
  balance,
  loss,
  income,
  expense,
  isLoading = false,
}: MoneyStatusProps) {
  return (
    <>
      <MoneyStat
        label="Calculation"
        color="gray.500"
        number={
          date === 1 ? monthlyBalance + income - expense : income - expense
        }
        isLoading={isLoading}
      />
      <MoneyStat
        label="Balance"
        color="orange.400"
        number={balance}
        isLoading={isLoading}
      />
      <MoneyStat
        label="Loss"
        color="red.500"
        number={loss}
        isLoading={isLoading}
      />
      <MoneyStat
        label="Income"
        color="whatsapp.500"
        number={income}
        isLoading={isLoading}
      />
      <MoneyStat
        label="Expense"
        color="whatsapp.500"
        number={expense}
        isLoading={isLoading}
      />
    </>
  );
}

function MoneyStat({
  label,
  color,
  number,
  isLoading,
}: {
  label: string;
  color: string;
  number: number;
  isLoading: boolean;
}) {
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber color={color} fontSize={isLargerThan640 ? 'xl' : 'sm'}>
        <Skeleton height={30} mr={4} isLoaded={!isLoading}>
          {formatCurrency(number)}
        </Skeleton>
      </StatNumber>
    </Stat>
  );
}

export default MoneyStatus;
