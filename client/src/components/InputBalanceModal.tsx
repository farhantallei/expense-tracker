import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useInputBalance, useInputMonthlyBalance } from '../hooks';
import { formatCurrency } from '../utils';

interface InputBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthly: boolean;
  year: number;
  month: number;
  week: number;
  date: number;
  balance?: number;
}

interface InputBalanceForm {
  amount: string;
}

function InputBalanceModal({
  isOpen,
  onClose,
  monthly,
  year,
  month,
  week,
  date,
  balance = 0,
}: InputBalanceModalProps) {
  const [amountValue, setAmountValue] = useState(balance);
  const initialRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<InputBalanceForm>();
  const { ref, ...rest } = register('amount', {
    required: 'Masukkan balance (sisa uang)',
    min: {
      value: 0,
      message: 'Minimal 0',
    },
  });
  const { mutate: inputBalanceMutate, isLoading: isInputBalanceLoading } =
    useInputBalance({
      year,
      month,
      week,
      onClose,
      resetField,
    });
  const {
    mutate: inputMonthlyBalanceMutate,
    isLoading: isInputMonthlyBalanceLoading,
  } = useInputMonthlyBalance({
    year,
    month,
    onClose,
    resetField,
  });

  const { account } = useAuthContext();

  function onValid() {
    if (monthly)
      return inputMonthlyBalanceMutate({
        userId: account?.id,
        amount: amountValue,
        year,
        month,
      });
    inputBalanceMutate({
      userId: account?.id,
      amount: amountValue,
      year,
      month,
      date,
    });
  }

  function parse(value: string) {
    return parseInt(value.replace(/\,/, ''));
  }

  function resetField() {
    setAmountValue(0);
  }

  useEffect(() => {
    if (!isOpen) return;
    setAmountValue(balance);
  }, [isOpen]);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={() => {
        clearErrors();
        onClose();
      }}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Input Your Balance on{' '}
          {new Intl.DateTimeFormat(undefined, {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
          }).format(new Date(year, month - 1, date))}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <NumberInput
              onChange={(valueString) => {
                if (!valueString) return setAmountValue(0);
                setAmountValue(parse(valueString));
              }}
              defaultValue={formatCurrency(amountValue)}
              value={formatCurrency(amountValue)}
              min={0}
              step={100}
              onKeyUp={(e) => {
                if (e.key === 'Enter') handleSubmit(onValid)();
              }}>
              <NumberInputField
                ref={(props) => {
                  ref(props);
                  initialRef.current = props;
                }}
                {...rest}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleSubmit(onValid)}
            isLoading={
              monthly ? isInputMonthlyBalanceLoading : isInputBalanceLoading
            }>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InputBalanceModal;
