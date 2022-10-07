import { Badge, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInAndOut, InAndOutResponse } from '../../../services/inAndOut';
import { formatCurrency } from '../../../utils';

interface ItemProps {
  id: string;
  name: string;
  type: 'expense' | 'income';
  amount: number | null;
  description: string;
  year: number;
  month: number;
  week: number;
  date: number;
}

function Item({
  id,
  name,
  type,
  amount,
  description,
  year,
  month,
  week,
  date,
}: ItemProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteInAndOut,
    onMutate: async () => {
      const queryKey = ['in and out', { year, month, week }, date];
      await queryClient.cancelQueries(queryKey);
      const prevData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData<InAndOutResponse[]>(queryKey, (old) => {
        if (old == null) return;
        return old.filter((item) => item.id !== id);
      });
      return { prevData };
    },
    onError: (err, newTodo, context) => {
      const queryKey = ['in and out', { year, month, week }, date];
      queryClient.setQueryData(queryKey, context?.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['in and out', { year, month, week }]);
      queryClient.invalidateQueries([
        'in and out',
        { year, month, week },
        date,
      ]);
    },
  });

  const color: Record<typeof type, string> = {
    expense: 'red',
    income: 'whatsapp.500',
  };

  const badge: Record<typeof type, { color: string; label: string }> = {
    expense: {
      color: 'red',
      label: 'Expense',
    },
    income: {
      color: 'green',
      label: 'Income',
    },
  };

  function handleDelete() {
    mutate({ id });
  }

  return (
    <Flex direction="column" borderWidth="1px" borderRadius="lg" p={4} gap={4}>
      <Flex direction="column" gap={0.5}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">{name}</Text>
          <Badge colorScheme={badge[type].color}>{badge[type].label}</Badge>
        </Flex>
        {amount == null ? null : (
          <Text fontSize="2xl" fontWeight="semibold" color={color[type]}>
            {formatCurrency(amount)}
          </Text>
        )}
        <Text>{description}</Text>
      </Flex>
      <ButtonGroup alignSelf="flex-end">
        <Button size="sm" colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
        <Button size="sm" colorScheme="gray">
          Edit
        </Button>
        <Button size="sm" colorScheme="blue">
          View
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default Item;
