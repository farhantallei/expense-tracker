import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Spacer,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';

interface ItemProps {
  onView?: () => void;
}

function Item({ onView }: ItemProps) {
  return (
    <Flex direction="column" borderWidth="1px" borderRadius="lg" p={4} gap={8}>
      <Flex alignItems="flex-start">
        <Box
          bg="gray.100"
          height="24px"
          width="24px"
          fontSize="1em"
          fontWeight="semibold"
          borderRadius="md">
          <Center>1</Center>
        </Box>
        <Spacer />
        <Flex gap={2}>
          <Badge colorScheme="green">Income</Badge>
          <Badge colorScheme="red">Expense</Badge>
        </Flex>
      </Flex>
      <Flex alignItems="center">
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
      <Flex alignItems="flex-end">
        <Text color="gray.400">1/9/2022</Text>
        <Spacer />
        <ButtonGroup gap={0.5}>
          <Button size="sm" colorScheme="green">
            Income
          </Button>
          <Button size="sm" colorScheme="red">
            Expense
          </Button>
          <Button size="sm" colorScheme="blue" onClick={onView}>
            View
          </Button>
          <Button size="sm" colorScheme="orange">
            Balance
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}

export default Item;
