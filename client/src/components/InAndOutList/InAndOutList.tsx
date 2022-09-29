import { VStack, StackDivider } from '@chakra-ui/react';
import { Item } from './components';

function InAndOutList({ children }: { children?: React.ReactNode }) {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      marginTop={4}
      align="stretch">
      {children}
    </VStack>
  );
}

InAndOutList.Item = Item;
export default InAndOutList;
