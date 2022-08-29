import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const styles = {
  global: {
    'html, body': {
      bgColor: '#F7F5EF',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
};

const fonts = {
  heading: 'Open sans, sans-serif',
  body: 'Open sans, sans-serif',
};

const colors = {
  brand: {
    500: '#F5726B',
  },
  secondary: {
    500: '#c9c8c3',
  },
};

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none',
      },
    },
  },
  Link: {
    baseStyle: {
      _hover: {
        color: 'inherit',
        textDecoration: 'none',
      },
    },
  },
};

const theme = extendTheme(
  {
    styles,
    fonts,
    colors,
    components,
  },
  withDefaultColorScheme({ colorScheme: 'brand' }),
);

export default theme;
