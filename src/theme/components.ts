/**
 * The theme's `components` key allows you to customize a component without wrapping it in another component.
 * You can change the styles, the default props, and more.
 * Learn more about palette customization
 * https://mui.com/material-ui/customization/theme-components/
 */

import type { Components } from '@mui/material/styles/components'
import { mixins } from './mixins'
import { palette } from './palette'
import { fonts } from './fonts'

export const components: Components = {
  // Name of the component
  MuiButton: {
    // defaultProps: {
    //   // The props to change the default for.
    //   disableRipple: true, // No more ripple!
    // },
    styleOverrides: {
      // Name of the slot/rule
      root: {
        fontWeight: 'bold',
        '& .MuiButton-startIcon, & .MuiButton-endIcon': {
          // transform: 'translateY(-1.25px)'
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: 'rgba(0, 0, 0, 0.12)',
      },
      input: {
        paddingBlock: '14.5px',
      },
      sizeSmall: {
        '& .MuiOutlinedInput-input': {
          paddingBlock: '8.5px',
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.MuiInputLabel-shrink': {
          marginTop: '0.5px',
        },
        '&:not(.MuiInputLabel-shrink)': {
          marginTop: '-1px',
        },
      },
    },
  },
  MuiTooltip: {
    defaultProps: {
      placement: 'top',
      arrow: true,
    },
    styleOverrides: {
      tooltip: {
        backgroundColor: palette.background?.dark,
        fontWeight: 'bold',
      },
      arrow: {
        color: palette.background?.dark,
      },
    },
  },
  MuiBadge: {
    styleOverrides: {
      dot: {
        boxShadow: `0 0 0 2px ${palette.background?.paper || ''}`,
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        // transform: 'translateY(1px)'
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      elevation1: {
        boxShadow: mixins.boxShadows?.primary.dark,
      },
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: {
        variant: 'h3',
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        // transform: 'translateY(1px)'
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      root: {
        ...mixins.keyframes?.pulse,
        animation: 'pulse 1.5s ease-in-out 0.3s infinite',
      },
      rectangular: {
        borderRadius: 4,
      },
    },
    defaultProps: {
      animation: 'wave',
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
    ${fonts}
    html {
      font-size: 62%;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    input:-internal-autofill-selected, input:-webkit-autofill {
      box-shadow: 0 0 0 40px white inset;
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
    input::-webkit-inner-spin-button, input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    `,
  },
}
