import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Skeleton,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  InAndOutList,
  InAndOutModal,
  InputBalanceModal,
  InputInAndOutModal,
  MoneyStatus,
} from '../components';
import { useAuthContext } from '../context/AuthContext';
import { useInAndOutList } from '../hooks';
import useMonthlyBalance from '../hooks/useMonthlyBalance';
import { GetInAndOutListResponse } from '../services/inAndOut';
import { formatCurrency, range } from '../utils';

function Dashboard() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDate, setCurrentDate] = useState(1);
  const [currentMonthlyBalance, setCurrentMonthlyBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const moduloMonth = useMemo((): number => {
    const modMonth = ((currentMonth % 12) + 12) % 12;
    if (modMonth === 0) return 12;
    return modMonth;
  }, [currentMonth]);
  const totalWeek = useMemo((): number => {
    if (
      currentMonth === new Date().getMonth() + 1 &&
      currentYear === new Date().getFullYear()
    ) {
      const currentDate = new Date().getDate();
      return Math.ceil(currentDate / 7);
    }
    return Math.ceil(getDaysInMonth(currentYear, currentMonth) / 7);
  }, [currentYear, currentMonth]);
  const [currentWeek, setCurrentWeek] = useState(totalWeek);
  const totalDays = useMemo((): number => {
    if (currentMonth === new Date().getMonth() + 1) {
      const currentDate = new Date().getDate();
      if (currentDate / 7 < 1) return currentDate % 7;
      return 7;
    }
    if (getDaysInMonth(currentYear, currentMonth) / currentWeek < 7)
      return getDaysInMonth(currentYear, currentMonth) % 7;
    return 7;
  }, [currentYear, currentMonth, currentWeek]);
  const {
    isOpen: isInAndOutModalOpen,
    onOpen: onInAndOutModalOpen,
    onClose: onInAndOutModalClose,
  } = useDisclosure();
  const {
    isOpen: isInputInAndOutModalOpen,
    onOpen: onInputInAndOutModalOpen,
    onClose: onInputInAndOutModalClose,
  } = useDisclosure();
  const {
    isOpen: isInputMonthlyBalanceModalOpen,
    onOpen: onInputMonthlyBalanceModalOpen,
    onClose: onInputMonthlyBalanceModalClose,
  } = useDisclosure();
  const {
    isOpen: isInputBalanceModalOpen,
    onOpen: onInputBalanceModalOpen,
    onClose: onInputBalanceModalClose,
  } = useDisclosure();
  const { account, setIsAuthenticated, setAccount } = useAuthContext();
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError, error } = useInAndOutList(
    totalDays,
    currentYear,
    moduloMonth,
    currentWeek
  );

  const {
    data: monthlyBalanceData,
    isLoading: isMonthlyBalanceLoading,
    isSuccess: isMonthlyBalanceSuccess,
    isError: isMonthlyBalanceError,
    error: monthlyBalanceError,
  } = useMonthlyBalance(currentYear, moduloMonth);

  const totalBalance = useMemo(
    (): number =>
      data?.reduce((currentTotal, item) => item.balance + currentTotal, 0) || 0,
    [data, isLoading, currentMonth]
  );

  const totalLoss = useMemo(
    (): number =>
      data?.reduce(
        (currentTotal, item) =>
          Math.max(item.income - item.expense - item.balance, 0) + currentTotal,
        0
      ) || 0,
    [data, isLoading, currentMonth]
  );

  const totalIncome = useMemo(
    (): number =>
      data?.reduce((currentTotal, item) => item.income + currentTotal, 0) || 0,
    [data, isLoading, currentMonth]
  );

  const totalExpense = useMemo(
    (): number =>
      data?.reduce((currentTotal, item) => item.expense + currentTotal, 0) || 0,
    [data, isLoading, currentMonth]
  );

  useEffect(() => {
    if (
      currentYear === new Date().getFullYear() &&
      currentMonth === new Date().getMonth() + 1
    )
      return setCurrentWeek(totalWeek);
    setCurrentWeek(1);
  }, [currentYear, currentMonth]);

  function setValue(item: GetInAndOutListResponse) {
    setCurrentDate(item.date);
    setCurrentBalance(item.balance);
  }

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
            if (moduloMonth === 1) setCurrentYear((prevYear) => prevYear - 1);
            setCurrentMonth((prevMonth) => prevMonth - 1);
          }}
          size="sm"
          variant="outline"
          aria-label="Previous month"
          icon={<ChevronLeftIcon />}
        />
        <Heading size="md" justifySelf="center" fontWeight="semibold">
          {formatDatePagination(new Date(currentYear, moduloMonth, 0))}
        </Heading>
        <IconButton
          onClick={() => {
            if (moduloMonth === 12) setCurrentYear((prevYear) => prevYear + 1);
            setCurrentMonth((prevMonth) => prevMonth + 1);
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
      <Grid templateColumns="0.5fr 1fr 0.5fr">
        <GridItem display="flex" flexDirection="column" marginTop={4} gap={2}>
          <Text color="gray.700" fontWeight="semibold">
            Saldo awal bulan:
          </Text>
          <Skeleton height={30} mr={4} isLoaded={!isMonthlyBalanceLoading}>
            {isMonthlyBalanceError ? (
              <Text fontSize="xl" fontWeight="semibold" color="red.500">
                {monthlyBalanceError instanceof Error
                  ? monthlyBalanceError.message
                  : 'Error'}
              </Text>
            ) : isMonthlyBalanceSuccess ? (
              <Text fontSize="xl" fontWeight="semibold" color="yellow.400">
                {formatCurrency(monthlyBalanceData.amount)}
              </Text>
            ) : null}
          </Skeleton>
        </GridItem>
        <GridItem
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={4}
          gap={2}>
          <Text color="gray.700" fontWeight="semibold">
            Week
          </Text>
          <ButtonGroup size="sm" isAttached variant="outline">
            {range(1, totalWeek).map((number) => (
              <Button
                key={number}
                isActive={number === currentWeek}
                onClick={() => setCurrentWeek(number)}>
                {number}
              </Button>
            ))}
          </ButtonGroup>
        </GridItem>
        <GridItem
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end">
          <Button
            size="sm"
            colorScheme="yellow"
            onClick={() => {
              if (monthlyBalanceData)
                setCurrentMonthlyBalance(monthlyBalanceData.amount);
              onInputMonthlyBalanceModalOpen();
            }}>
            Monthly Balance
          </Button>
        </GridItem>
      </Grid>
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
        {/* <MoneyStatus
          balance={totalBalance}
          loss={totalLoss}
          income={totalIncome}
          expense={totalExpense}
          isLoading={isLoading}
        /> */}
      </Flex>
      {/* List */}
      <InAndOutList isLoading={isLoading} isError={isError} error={error}>
        {isSuccess
          ? data.map((item) => (
              <InAndOutList.Item
                key={item.date}
                year={currentYear}
                month={moduloMonth}
                date={item.date}
                balance={item.balance}
                income={item.income}
                expense={item.expense}
                onBalance={() => {
                  setValue(item);
                  onInputBalanceModalOpen();
                }}
                onInput={() => {
                  setValue(item);
                  onInputInAndOutModalOpen();
                }}
                onView={() => {
                  setValue(item);
                  onInAndOutModalOpen();
                }}
              />
            ))
          : null}
      </InAndOutList>
      <InAndOutModal
        isOpen={isInAndOutModalOpen}
        onClose={onInAndOutModalClose}
        year={currentYear}
        month={moduloMonth}
        week={currentWeek}
        date={currentDate}
        onBalance={onInputBalanceModalOpen}
        onInput={onInputInAndOutModalOpen}
      />
      <InputBalanceModal
        isOpen={isInputMonthlyBalanceModalOpen}
        onClose={onInputMonthlyBalanceModalClose}
        monthly={true}
        year={currentYear}
        month={moduloMonth}
        week={currentWeek}
        date={currentDate}
        balance={currentMonthlyBalance}
      />
      <InputBalanceModal
        isOpen={isInputBalanceModalOpen}
        onClose={onInputBalanceModalClose}
        monthly={false}
        year={currentYear}
        month={moduloMonth}
        week={currentWeek}
        date={currentDate}
        balance={currentBalance}
      />
      <InputInAndOutModal
        isOpen={isInputInAndOutModalOpen}
        onClose={onInputInAndOutModalClose}
        year={currentYear}
        month={moduloMonth}
        week={currentWeek}
        date={currentDate}
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
