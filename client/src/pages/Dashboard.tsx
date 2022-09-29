import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { InAndOutList, InAndOutModal } from '../components';
import { useAuthContext } from '../context/AuthContext';

function Dashboard() {
  const {
    isOpen: isInAndOutModalOpen,
    onOpen: onInAndOutModalOpen,
    onClose: onInAndOutModalClose,
  } = useDisclosure();
  const { account, setIsAuthenticated, setAccount } = useAuthContext();
  const navigate = useNavigate();

  function logout() {
    setAccount(null);
    setIsAuthenticated(false);
    navigate('/login', { replace: true });
  }

  return (
    <Container maxW="2xl" paddingY={50}>
      {/* Header */}
      <Flex alignItems="center">
        <Box p="2">
          <Heading size="md">Expense Tracker</Heading>
        </Box>
        <Spacer />
        <Flex alignItems="center" gap={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Hai, {account?.username}
          </Text>
          <Button size="sm" colorScheme="gray" onClick={logout}>
            Logout
          </Button>
        </Flex>
      </Flex>
      {/* Date */}
      <Grid
        templateColumns="max-content 1fr max-content"
        marginTop={8}
        alignItems="center">
        <IconButton
          size="sm"
          variant="outline"
          aria-label="Previous month"
          icon={<ChevronLeftIcon />}
        />
        <Heading size="md" justifySelf="center" fontWeight="semibold">
          Agustus/2022
        </Heading>
        <IconButton
          size="sm"
          variant="outline"
          aria-label="Next month"
          icon={<ChevronRightIcon />}
        />
      </Grid>
      {/* Pagination */}
      <Flex flexDirection="column" alignItems="center" marginTop={4} gap={2}>
        <Text color="gray.700" fontWeight="semibold">
          Week
        </Text>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button isActive>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>4</Button>
          <Button>5</Button>
        </ButtonGroup>
      </Flex>
      {/* Stat */}
      <Flex
        position="sticky"
        top={0}
        bg="white"
        alignItems="center"
        paddingTop={8}
        paddingBottom={4}
        zIndex={10}
        borderBottomWidth="1px">
        <Stat>
          <StatLabel>Balance</StatLabel>
          <StatNumber color="orange.400" fontSize="xl">
            Rp 70.000
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Available</StatLabel>
          <StatNumber color="gray.500" fontSize="xl">
            Rp 100.000
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Loss</StatLabel>
          <StatNumber color="red.500" fontSize="xl">
            Rp 100.000
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Income</StatLabel>
          <StatNumber color="whatsapp.500" fontSize="xl">
            Rp 100.000
          </StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Expense</StatLabel>
          <StatNumber color="red.500" fontSize="xl">
            Rp 100.000
          </StatNumber>
        </Stat>
      </Flex>
      {/* List */}
      <InAndOutList>
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
        <InAndOutList.Item onView={onInAndOutModalOpen} />
      </InAndOutList>
      <InAndOutModal
        isOpen={isInAndOutModalOpen}
        onClose={onInAndOutModalClose}
      />
    </Container>
  );
}

export default Dashboard;
