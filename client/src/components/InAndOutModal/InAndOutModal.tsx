import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Item } from './components';

interface InAndOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function InAndOutModal({ isOpen, onClose }: InAndOutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>1/9/2022</ModalHeader>
        <ModalCloseButton />
        <Flex
          justifyContent="space-between"
          alignItems="center"
          paddingInlineStart={6}
          paddingInlineEnd={6}
          pb={4}
          borderBottomWidth="1px">
          <Text fontSize="1.8em" fontWeight="semibold" color="whatsapp.500">
            + Rp. 100.000
          </Text>
          <Flex gap={2}>
            <Badge alignSelf="flex-end" colorScheme="green">
              Income
            </Badge>
            <Badge alignSelf="flex-end" colorScheme="red">
              Expense
            </Badge>
          </Flex>
        </Flex>
        <ModalBody display="flex" flexDirection="column" py={6} gap={4}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </ModalBody>
        <ModalFooter borderTopWidth="1px">
          <Button colorScheme="orange">Balance</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InAndOutModal;
