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
import { useAuthContext } from '../../context/AuthContext';
import { useInputBalance } from '../../hooks';

interface InputBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  week: number;
  date: number;
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
}: InputBalanceModalProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const initialRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    resetField,
    getValues,
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
    date,
    onClose,
    resetField,
    setErrorMessage,
  });
  const { account } = useAuthContext();

  function onValid(data: InputBalanceForm) {
    mutate({ userId: account?.id, amount: data.amount, year, month, date });
  }

  useEffect(() => {
    if (!isOpen) return;
    if (isNaN(getValues('amount'))) {
      resetField('amount');
    }
  }, [isOpen]);

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={() => {
        clearErrors();
        setErrorMessage('');
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
          <FormControl isInvalid={!!errorMessage || !!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <NumberInput
              defaultValue={0}
              min={0}
              step={100}
              onKeyUp={(e) => {
                if (e.key === 'Enter') handleSubmit(onValid)();
              }}>
              <NumberInputField
                ref={(e) => {
                  ref(e);
                  initialRef.current = e;
                }}
                {...rest}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>
              {errorMessage || errors.amount?.message}
            </FormErrorMessage>
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
