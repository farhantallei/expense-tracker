import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';

function Item() {
  return (
    <Flex direction="column" borderWidth="1px" borderRadius="lg" p={4} gap={4}>
      <Flex direction="column" gap={0.5}>
        <Text fontSize="2xl">Makan di wisma</Text>
        <Text fontSize="2xl" fontWeight="semibold" color="red">
          Rp. 5.000
        </Text>
        <Text>Telur, nasi, tahu, tempe</Text>
      </Flex>
      <ButtonGroup alignSelf="flex-end">
        <Button size="sm" colorScheme="red">
          Delete
        </Button>
        <Button size="sm" colorScheme="gray">
          Edit
        </Button>
        <Button size="sm" colorScheme="blue">
          View
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default Item;
