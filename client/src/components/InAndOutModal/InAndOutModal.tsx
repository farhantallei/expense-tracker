import {
  Badge,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useInAndOutByDate } from '../../hooks';
import { GetInAndOutListResponse } from '../../services/inAndOut';
import MoneyStatus from '../MoneyStatus';
import { Item } from './components';

interface InAndOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  week: number;
  date: number;
  onBalance?: () => void;
  onInput?: () => void;
}

function InAndOutModal({
  isOpen,
  onClose,
  year,
  month,
  week,
  date,
  onBalance,
  onInput,
}: InAndOutModalProps) {
  const queryClient = useQueryClient();
  const inAndOutList = queryClient.getQueryData<GetInAndOutListResponse[]>([
    'in and out',
    { year, month, week },
  ]);

  const balance = useMemo((): number | undefined => {
    if (!inAndOutList) return;
    const idx = inAndOutList.findIndex((item) => item.date === date);
    return inAndOutList[idx]?.balance;
  }, [inAndOutList, month, date]);

  const income = useMemo((): number | undefined => {
    if (!inAndOutList) return;
    const idx = inAndOutList.findIndex((item) => item.date === date);
    return inAndOutList[idx]?.income;
  }, [inAndOutList, month, date]);

  const expense = useMemo((): number | undefined => {
    if (!inAndOutList) return;
    const idx = inAndOutList.findIndex((item) => item.date === date);
    return inAndOutList[idx]?.expense;
  }, [inAndOutList, month, date]);

  const loss = useMemo((): number | undefined => {
    if (income == null || expense == null || balance == null) return;
    return Math.max(income - expense - balance, 0);
  }, [inAndOutList, month, date]);

  const { data, isLoading, isSuccess, isError, error } = useInAndOutByDate(
    year,
    month,
    week,
    date
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${date}/${month}/${year}`}</ModalHeader>
        <ModalCloseButton />
        <Flex
          gap={2}
          justifyContent="flex-end"
          alignItems="center"
          paddingInlineStart={6}
          paddingInlineEnd={6}
          pb={4}>
          {income ? (
            <Badge alignSelf="flex-end" colorScheme="green">
              Income
            </Badge>
          ) : null}
          {expense ? (
            <Badge alignSelf="flex-end" colorScheme="red">
              Expense
            </Badge>
          ) : null}
        </Flex>
        <Flex
          paddingInlineStart={6}
          paddingInlineEnd={6}
          pb={4}
          borderBottomWidth="1px">
          <MoneyStatus
            balance={balance || 0}
            loss={loss || 0}
            income={income || 0}
            expense={expense || 0}
          />
        </Flex>
        <ModalBody display="flex" flexDirection="column" py={6} gap={4}>
          {isLoading ? (
            <>
              <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
              <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
              <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
            </>
          ) : isError ? (
            <Center>
              <Text fontSize="2xl" fontWeight="semibold" color="red">
                {error instanceof Error
                  ? error.message
                  : 'Something goes wrong. Please refresh your page.'}
              </Text>
            </Center>
          ) : isSuccess ? (
            data.map((item) => (
              <Item
                id={item.id}
                name={item.name}
                type={item.type}
                amount={item.amount}
                description={item.description}
                year={item.year}
                month={item.month}
                week={week}
                date={item.date}
              />
            ))
          ) : null}
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <ButtonGroup>
            <Button size="sm" colorScheme="purple" onClick={onBalance}>
              Balance
            </Button>
            <Button size="sm" colorScheme="messenger" onClick={onInput}>
              Input
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InAndOutModal;
