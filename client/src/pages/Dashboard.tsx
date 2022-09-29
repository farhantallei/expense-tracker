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
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InAndOutList, InAndOutModal } from '../components';
import { useAuthContext } from '../context/AuthContext';

function Dashboard() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const {
    isOpen: isInAndOutModalOpen,
    onOpen: onInAndOutModalOpen,
    onClose: onInAndOutModalClose,
  } = useDisclosure();
  const { account, setIsAuthenticated, setAccount } = useAuthContext();
  const navigate = useNavigate();
  const totalWeek = useMemo((): number => {
    if (currentMonth === new Date().getMonth() + 1) {
      const currentDate = new Date().getDate();
      return Math.ceil(currentDate / 7);
    }
    return Math.ceil(getDaysInMonth(currentYear, currentMonth) / 7);
  }, [currentYear, currentMonth]);
  const [currentWeek, setCurrentWeek] = useState(totalWeek);

  useEffect(() => {
    if (
      currentYear === new Date().getFullYear() &&
      currentMonth === new Date().getMonth() + 1
    )
      return setCurrentWeek(totalWeek);
    setCurrentWeek(1);
  }, [currentYear, currentMonth]);

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
          onClick={() => {
            setCurrentMonth((prevMonth) => {
              if (prevMonth > 0) return prevMonth - 1;
              setCurrentYear((prevYear) => prevYear - 1);
              return 11;
            });
          }}
          size="sm"
          variant="outline"
          aria-label="Previous month"
          icon={<ChevronLeftIcon />}
        />
        <Heading size="md" justifySelf="center" fontWeight="semibold">
          {formatDatePagination(new Date(currentYear, currentMonth, 0))}
        </Heading>
        <IconButton
          onClick={() => {
            setCurrentMonth((prevMonth) => {
              if (prevMonth < 12) return prevMonth + 1;
              setCurrentYear((prevYear) => prevYear + 1);
              return 0;
            });
          }}
          disabled={
            currentYear === new Date().getFullYear() &&
            currentMonth === new Date().getMonth() + 1
          }
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
          {[...Array(totalWeek)].map((x, i) => (
            <Button
              isActive={i + 1 === currentWeek}
              onClick={() => setCurrentWeek(i + 1)}>
              {i + 1}
            </Button>
          ))}
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

function formatDatePagination(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export default Dashboard;
