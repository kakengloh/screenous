import {
  Center,
  HStack,
  VStack,
  Heading,
  Button,
  Text,
  Box,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import { Page, Header, Content } from 'components/layouts';

const Home: NextPage = () => {
  return (
    <Page
      meta={{
        title: 'Screenous - Record your screen, share it in seconds',
        description:
          'Screenous is a FREE online screen recording and sharing app. Record your screen and share it through a generated quick link. No sign-up or installation is required.',
      }}
    >
      <Header />
      <Content>
        <Center h="100vh" w="full" justifyContent="center">
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <HStack
              w="full"
              justify="center"
              spacing="16"
              align="start"
              flexWrap="wrap"
              rowGap="10"
            >
              <VStack align="start" spacing="8">
                <Text color="gray">Screenous is free to use for everyone</Text>
                <Heading as="h2" fontSize="3xl" fontWeight="bold">
                  Record your screen, <br /> share it in seconds
                </Heading>
                <Text>No sign-up or installation is required</Text>
                <Link href="/record" className="block">
                  <Button>Get started</Button>
                </Link>
              </VStack>
              <Box display={{ base: 'none', md: 'block' }} h="36" w="36">
                <motion.img
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3 }}
                  src="/images/record.svg"
                  alt="Record icon"
                />
              </Box>
            </HStack>
          </motion.div>
        </Center>
      </Content>
    </Page>
  );
};

export default Home;
