import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import MoneyStatus from '../../MoneyStatus';

interface ItemProps {
  date: number;
  month: number;
  year: number;
  balance: number;
  income: number;
  expense: number;
  onIncome?: () => void;
  onBalance?: () => void;
  onView?: () => void;
}

function Item({
  date,
  month,
  year,
  balance,
  income,
  expense,
  onIncome,
  onBalance,
  onView,
}: ItemProps) {
  return (
    <Flex direction="column" borderWidth="1px" borderRadius="lg" p={4} gap={8}>
      <Flex alignItems="flex-start">
        <Box
          bg="gray.100"
          height="24px"
          width="24px"
          fontSize="1em"
          fontWeight="semibold"
          borderRadius="md">
          <Center>{date}</Center>
        </Box>
        <Spacer />
        <Flex gap={2}>
          {income ? <Badge colorScheme="green">Income</Badge> : null}
          {expense ? <Badge colorScheme="red">Expense</Badge> : null}
        </Flex>
      </Flex>
      <Flex alignItems="center">
        <MoneyStatus
          balance={balance}
          loss={Math.max((income - expense - balance) * -1, 0)}
          income={income}
          expense={expense}
        />
      </Flex>
      <Flex alignItems="flex-end">
        <Text color="gray.400">{`${date}/${month}/${year}`}</Text>
        <Spacer />
        <ButtonGroup gap={0.5}>
          <Button size="sm" colorScheme="green" onClick={onIncome}>
            Income
          </Button>
          <Button size="sm" colorScheme="red">
            Expense
          </Button>
          <Button size="sm" colorScheme="orange" onClick={onBalance}>
            Balance
          </Button>
          <Button size="sm" colorScheme="blue" onClick={onView}>
            View
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Item;
