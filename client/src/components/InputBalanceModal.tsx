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
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useInputBalance } from '../hooks';

interface InputBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  week: number;
  date: number;
  balance?: number;
}

interface InputBalanceForm {
  amount: number;
}

function InputBalanceModal({
  isOpen,
  onClose,
  year,
  month,
  week,
  date,
  balance = 0,
}: InputBalanceModalProps) {
  const initialRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    resetField,
  } = useForm<InputBalanceForm>();
  const { ref, ...rest } = register('amount', {
    required: 'Masukkan balance (sisa uang)',
    min: {
      value: 0,
      message: 'Minimal 0',
    },
    valueAsNumber: true,
  });
  const { mutate, isLoading } = useInputBalance({
    year,
    month,
    week,
    onClose,
    resetField,
  });
  const { account } = useAuthContext();

  function onValid(data: InputBalanceForm) {
    if (data.amount === 0) {
      resetField('amount');
      onClose();
      return;
    }
    mutate({ userId: account?.id, amount: data.amount, year, month, date });
  }

  useEffect(() => {
    if (!isOpen) return;
    resetField('amount');
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
              defaultValue={balance}
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
            isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InputBalanceModal;
