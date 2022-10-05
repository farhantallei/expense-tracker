import { VStack, StackDivider, Skeleton, Center, Text } from '@chakra-ui/react';
import { Item } from './components';

interface InAndOutListProps {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  children?: React.ReactNode;
}

function InAndOutList({
  isLoading,
  isError,
  error,
  children,
}: InAndOutListProps) {
  return (
    <VStack
      divider={isLoading ? undefined : <StackDivider borderColor="gray.200" />}
      spacing={4}
      marginTop={4}
      align="stretch">
      {isLoading ? (
        <>
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
          <Skeleton height={205} borderRadius="lg" isLoaded={!isLoading} />
        </>
      ) : isError ? (
        <Center>
          <Text fontSize="2xl" fontWeight="semibold" color="red">
            {error instanceof Error
              ? error.message
              : 'Something goes wrong. Please refresh your page.'}
          </Text>
        </Center>
      ) : (
        children
      )}
    </VStack>
  );
}

InAndOutList.Item = Item;
export default InAndOutList;
