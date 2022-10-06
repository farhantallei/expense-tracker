import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
  Textarea,
} from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useInputIncome } from '../hooks';

interface InputIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  week: number;
  date: number;
}

interface InputIncomeForm {
  name: string;
  amount: number;
  description: string;
}

function InputIncomeModal({
  isOpen,
  onClose,
  year,
  month,
  week,
  date,
}: InputIncomeModalProps) {
  const initialRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    resetField,
  } = useForm<InputIncomeForm>();
  const { ref, ...rest } = register('name', {
    required: 'Masukkan nama (eg. ATM, Dari Fulan, dll)',
    minLength: {
      value: 1,
      message: 'Minimal 1 karakter',
    },
  });
  const { mutate, isLoading } = useInputIncome({
    year,
    month,
    week,
    onClose,
    resetField,
  });
  const { account } = useAuthContext();

  function onValid({ name, amount, description }: InputIncomeForm) {
    onClose();
    mutate({
      userId: account?.id,
      name,
      type: 'income',
      amount,
      description,
      year,
      month,
      date,
    });
  }

  function onEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit(onValid)();
  }

  useEffect(() => {
    if (!isOpen) return;
    resetField('name');
    resetField('amount');
    resetField('description');
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
          Input Your Income on{' '}
          {new Intl.DateTimeFormat(undefined, {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
          }).format(new Date(year, month - 1, date))}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              onKeyUp={onEnter}
              ref={(props) => {
                ref(props);
                initialRef.current = props;
              }}
              {...rest}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.amount}>
            <FormLabel>Amount</FormLabel>
            <NumberInput defaultValue={0} min={0} step={100} onKeyUp={onEnter}>
              <NumberInputField
                {...register('amount', {
                  required: 'Masukkan income (pemasukkan)',
                  min: {
                    value: 100,
                    message: 'Minimal 100',
                  },
                  valueAsNumber: true,
                })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea {...register('description')} />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={handleSubmit(onValid)}
            isLoading={false}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InputIncomeModal;
