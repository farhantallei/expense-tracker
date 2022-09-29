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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks';
import { AuthRequest } from '../../services/auth';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<AuthRequest>();
  const { mutate, isLoading } = useAuth('register');

  function onValid(data: AuthRequest) {
    mutate(data);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        clearErrors();
        onClose();
      }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              {...register('username', {
                required: 'Masukkan username',
                minLength: {
                  value: 3,
                  message: 'Minimal 3 huruf/angka/simbol',
                },
              })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: 'Masukkan password',
                minLength: {
                  value: 3,
                  message: 'Minimal 3 huruf/angka/simbol',
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="blue"
            onClick={handleSubmit(onValid)}>
            Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegisterModal;
