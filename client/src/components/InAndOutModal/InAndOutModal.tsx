import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
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
}

function InAndOutModal({
  isOpen,
  onClose,
  year,
  month,
  week,
  date,
  onBalance,
}: InAndOutModalProps) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<GetInAndOutListResponse[]>([
    'in and out',
    { year, month, week },
  ]);

  const balance = useMemo((): number | undefined => {
    if (!data) return;
    const idx = data.findIndex((item) => item.date === date);
    return data[idx]?.balance;
  }, [data, month, date]);

  const income = useMemo((): number | undefined => {
    if (!data) return;
    const idx = data.findIndex((item) => item.date === date);
    return data[idx]?.income;
  }, [data, month, date]);

  const expense = useMemo((): number | undefined => {
    if (!data) return;
    const idx = data.findIndex((item) => item.date === date);
    return data[idx]?.expense;
  }, [data, month, date]);

  const loss = useMemo((): number | undefined => {
    if (income == null || expense == null || balance == null) return;
    return Math.max((income - expense - balance) * -1, 0);
  }, [data, month, date]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>1/9/2022</ModalHeader>
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
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button colorScheme="orange" onClick={onBalance}>
            Balance
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InAndOutModal;
