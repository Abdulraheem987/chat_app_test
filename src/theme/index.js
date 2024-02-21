/* eslint-disable prettier/prettier */
import {extendTheme} from 'native-base';

export const customTheme = extendTheme({
  fonts: {
    header: 'MontExtrabold',
    medium: 'MontMedium',
    regular: 'MontRegular',
    semibold: 'MontSemibold',
  },
  colors: {
    black: {
      50: '#fff',
      100: '#C4C4C4',
      200: '#7C7C7C',
      300: '#292929',
      800: '#181725',
    },

    primary: {
      50: '#A7EDFF',
      100: '#6EA3FF',
      200: '#6189FD',
      300: '#0031DF',
      400: '#001BE8',
    },
  },
  components: {
    Divider: {
      baseStyle: ({colorMode}) => {
        return {
          backgroundColor: colorMode === 'dark' ? 'black.100' : 'black.200',
        };
      },
    },
    Heading: {
      baseStyle: ({colorMode}) => {
        return {
          color: colorMode === 'dark' ? 'black.100' : 'primary.500',
        };
      },
      defaultProps: {
        size: 'xl',
        fontFamily: 'Lato-Regular',
      },
    },
    Text: {
      baseStyle: ({colorMode}) => {
        return {
          color: colorMode === 'dark' ? 'black.100' : 'black.300',
        };
      },
      defaultProps: {
        size: 'md',
        fontFamily: 'Lato-bold',
      },
      sizes: {
        xl: {
          fontSize: '64px',
        },
        lg: {
          fontSize: '32px',
        },
        md: {
          fontSize: '20px',
        },
        sm: {
          fontSize: '12px',
          fontFamily: 'Lato-Regular',
        },
        xs: {
          fontSize: '8px',
        },
        fourteen: {
          fontSize: '14px',
        },
        sixteen: {
          fontSize: '16px',
        },
      },
    },
    IconButton: {
      baseStyle: ({colorMode}) => {
        return {
          color: colorMode === 'dark' ? 'black.100' : 'black.300',
        };
      },
    },
  },
});
