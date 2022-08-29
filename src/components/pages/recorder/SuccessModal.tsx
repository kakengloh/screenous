import {
  Button,
  Center,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Spinner,
  useClipboard,
} from '@chakra-ui/react';
import { FiCopy } from 'react-icons/fi';

interface SuccessModalProps extends Omit<ModalProps, 'children'> {
  downloadUrl: string;
  shareableUrl: string;
}

const SuccessModal = ({
  shareableUrl,
  downloadUrl,
  ...props
}: SuccessModalProps) => {
  const { onCopy } = useClipboard(shareableUrl);

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share your clip</ModalHeader>
        <ModalBody>
          {shareableUrl ? (
            <InputGroup>
              <Input readOnly value={shareableUrl} />
              <InputRightElement cursor="pointer">
                <Icon as={FiCopy} onClick={onCopy} color="brand.500" />
              </InputRightElement>
            </InputGroup>
          ) : (
            <Center>
              <Spinner color="brand.500" />
            </Center>
          )}
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="gray" onClick={props.onClose}>
              Close
            </Button>
            <Button as="a" href={downloadUrl} download="Screen recording.webm">
              Download clip
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
