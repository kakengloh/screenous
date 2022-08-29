import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <Box as="main">{children}</Box>;
};

export default Content;
