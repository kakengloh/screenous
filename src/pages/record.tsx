import {
  Center,
  VStack,
  Icon,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import { Page, Header, Content } from 'components/layouts';
import SuccessModal from 'components/pages/recorder/SuccessModal';
import { FiMic, FiMicOff, FiPlayCircle, FiStopCircle } from 'react-icons/fi';
import { useRecorder } from 'hooks';
import { useState } from 'react';
import { useS3Upload } from 'hooks/useS3Upload';

const Record: NextPage = () => {
  const [blobUrl, setBlobUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [shareableUrl, setShareableUrl] = useState('');

  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();

  const { mutate: s3Upload } = useS3Upload();

  const onRecordStop = async (blob: Blob) => {
    setBlobUrl(URL.createObjectURL(blob));
    s3Upload(blob, {
      onSuccess: ({ id, downloadUrl }) => {
        setDownloadUrl(downloadUrl);
        setShareableUrl(`${window.location.origin}/play/${id}`);
        onSuccessModalOpen();
      },
    });
  };

  const {
    isRecording,
    isMuted,
    toggleMute,
    timeElapsed,
    startRecord,
    stopRecord,
  } = useRecorder({ onRecordStop });

  return (
    <Page>
      <Header />
      <Content>
        <Center h="100vh" w="full">
          <VStack spacing="5">
            <video
              src={blobUrl}
              autoPlay
              controls
              width="800"
              height="400"
              style={{ borderRadius: 15, objectFit: 'cover' }}
            />
            {isMuted ? (
              <Center
                border="1px solid white"
                p="3"
                rounded="full"
                cursor="pointer"
                _hover={{ opacity: 0.6 }}
                transition=".3s ease-out"
                bg="secondary.500"
                onClick={toggleMute}
              >
                <Icon as={FiMicOff} h="6" w="6" color="white" />
              </Center>
            ) : (
              <Center
                border="1px solid gray"
                p="3"
                rounded="full"
                cursor="pointer"
                _hover={{ opacity: 0.6 }}
                transition=".3s ease-out"
                onClick={toggleMute}
              >
                <Icon as={FiMic} h="6" w="6" color="gray" />
              </Center>
            )}
            {isRecording ? (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 3,
                }}
              >
                <Button
                  leftIcon={<Icon as={FiStopCircle} />}
                  onClick={stopRecord}
                >
                  Stop recording
                </Button>
              </motion.div>
            ) : (
              <Button
                leftIcon={<Icon as={FiPlayCircle} />}
                onClick={startRecord}
              >
                Start recording
              </Button>
            )}
            {isRecording && (
              <Text color="gray">
                {timeElapsed.seconds === 0
                  ? 5 - timeElapsed.minutes
                  : 4 - timeElapsed.minutes}
                m {timeElapsed.seconds === 0 ? 0 : 60 - timeElapsed.seconds}s
              </Text>
            )}
          </VStack>
        </Center>
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={onSuccessModalClose}
          downloadUrl={downloadUrl}
          shareableUrl={shareableUrl}
        />
      </Content>
    </Page>
  );
};

export default Record;
