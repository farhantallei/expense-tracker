import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { RegisterModal } from '../components';
import { useAuth } from '../hooks';
import { AuthRequest } from '../services/auth';

function Login() {
  const {
    isOpen: isRegisterModalOpen,
    onOpen: onRegisterModalOpen,
    onClose: onRegisterModalClose,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>();
  const { mutate, isLoading } = useAuth('login');

  function onValid(data: AuthRequest) {
    mutate(data);
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Expense Tracker 💰
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit(onValid)}>
            <Flex flexDirection="column" gap={4}>
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
              <FormControl isInvalid={!!errors.password}>
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
              <Button
                isLoading={isLoading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
                marginTop={2}>
                Sign in
              </Button>
              <Button variant="ghost" onClick={onRegisterModalOpen}>
                Register
              </Button>
            </Flex>
          </form>
        </Box>
      </Stack>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={onRegisterModalClose}
      />
    </Flex>
  );
}

export default Login;
