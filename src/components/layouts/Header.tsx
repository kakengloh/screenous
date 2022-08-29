import { Flex, Heading, HStack, Image, Link } from '@chakra-ui/react';

export default function Header() {
  return (
    <Flex as="header" shadow="base" h="16" w="full" align="center" px="5">
      <Flex
        w="container.xl"
        mx="auto"
        justify="space-between"
        px={{ base: '2', md: 0 }}
      >
        <Link href="/">
          <HStack align="center" cursor="pointer">
            <Heading as="h1" fontSize="md" fontWeight="bold">
              Screenous
            </Heading>
            <Image
              src="/images/record-2.svg"
              alt="Screenous logo"
              h="4"
              w="4"
            />
          </HStack>
        </Link>
        <HStack align="center" spacing="7">
          <a
            href="https://github.com/kakengloh/screenous"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/images/github.svg" alt="Github logo" w="6" h="6" />
          </a>
        </HStack>
      </Flex>
    </Flex>
  );
}
