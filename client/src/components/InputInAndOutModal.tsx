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
  Select,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../context/AuthContext';
import { useInputInAndOut } from '../hooks';
import { formatCurrency } from '../utils';

interface InputInAndOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  year: number;
  month: number;
  week: number;
  date: number;
}

interface InputInAndOutForm {
  name: string;
  type: 'expense' | 'income';
  group: boolean;
  amount: string;
  description: string;
}

function InputInAndOutModal({
  isOpen,
  onClose,
  year,
  month,
  week,
  date,
}: InputInAndOutModalProps) {
  const [amountValue, setAmountValue] = useState(0);
  const [isExpenseSelected, setIsExpenseSelected] = useState(false);
  const [isGroupSelected, setIsGroupSelected] = useState(false);
  const initialRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    resetField,
    watch,
  } = useForm<InputInAndOutForm>();
  const { ref, ...rest } = register('name', {
    required: 'Masukkan nama (eg. ATM, Dari Fulan, Makan, Belanja, dll)',
    minLength: {
      value: 1,
      message: 'Minimal 1 karakter',
    },
  });
  const { mutate, isLoading } = useInputInAndOut({
    year,
    month,
    week,
    onClose,
    resetField: resetAllField,
  });
  const { account } = useAuthContext();

  function onValid({ name, type, group, description }: InputInAndOutForm) {
    onClose();
    mutate({
      userId: account?.id,
      name,
      type,
      amount: group ? undefined : amountValue,
      description,
      year,
      month,
      date,
    });
  }

  function onEnter(e: KeyboardEvent<HTMLInputElement & HTMLTextAreaElement>) {
    if (e.key === 'Enter') handleSubmit(onValid)();
  }

  function resetAllField() {
    resetField('name');
    resetField('type');
    resetField('group');
    setAmountValue(0);
    resetField('description');
  }

  function parse(value: string) {
    return parseInt(value.replace(/\,/, ''));
  }

  useEffect(() => {
    if (!isOpen) return;
    resetAllField();
  }, [isOpen]);

  useEffect(() => {
    if (watch('type') === 'expense') return setIsExpenseSelected(true);
    setIsExpenseSelected(false);
  }, [watch('type')]);

  useEffect(() => {
    if (watch('group')) return setIsGroupSelected(true);
    setIsGroupSelected(false);
  }, [watch('group')]);

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
          Input Your Activity on{' '}
          {new Intl.DateTimeFormat(undefined, {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
          }).format(new Date(year, month - 1, date))}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" gap={2}>
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
          <FormControl isInvalid={!!errors.type}>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Select type"
              {...register('type', {
                required: 'Pilih tipe (pemasukkan / pengeluaran)',
              })}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
            <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
          </FormControl>
          {isExpenseSelected ? (
            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>Group?</FormLabel>
              <Switch {...register('group')} />
            </FormControl>
          ) : null}
          {isExpenseSelected && isGroupSelected ? null : (
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
                onKeyUp={onEnter}>
                <NumberInputField
                  {...register('amount', {
                    required: isExpenseSelected
                      ? false
                      : 'Masukkan expense (pengeluaran)',
                    min: {
                      value: 100,
                      message: 'Minimal 100',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>
          )}
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
            isLoading={isLoading}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InputInAndOutModal;
