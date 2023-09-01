/**
 * Default theme mixins provided by MUI
 * https://mui.com/material-ui/customization/default-theme/?expand-path=$.mixins
 */

import type { MixinsOptions } from '@mui/material/styles/createMixins'

/* eslint-disable @typescript-eslint/consistent-type-definitions 
-- module augmentation must be in interface  */
declare module '@mui/material/styles/createMixins' {
  type BoxShadow = {
    light: string
    dark: string
  }
  interface Mixins {
    fixes: {
      translateY: (spacing?: number) => {
        transform: string
      }
    }
    boxShadows: {
      primary: BoxShadow
      secondary: BoxShadow
    }
    transitions: {
      expand: (isExpanded: boolean) => {
        transform: string
        transition: string
      }
    }
    keyframes: {
      spin: Record<string, unknown>
      pulse: Record<string, unknown>
      pulsate: Record<string, unknown>
      glow: Record<string, unknown>
      sign: Record<string, unknown>
      move: (
        keyframeName: string,
        startOffset: string,
        endOffset: string,
      ) => Record<string, unknown>
      spinStart: Record<string, unknown>
      spinEnd: Record<string, unknown>
    }
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export const mixins: MixinsOptions = {
  fixes: {
    translateY: (spacing = 1) => ({
      transform: `translateY(${Number.isNaN(spacing) ? spacing : `${spacing}px`})`,
    }),
  },
  boxShadows: {
    primary: {
      light: '0px 1px 4px 0px rgba(150, 150, 150, 0.30)',
      dark: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
    },
    secondary: {
      light: '0px 1px 1px 0px rgba(150, 150, 150, 0.30)',
      dark: '0 1px 1px 0 rgba(0, 0, 0, 0.16)',
    },
  },
  transitions: {
    expand: (isExpanded) => ({
      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    }),
  },
  keyframes: {
    spin: {
      '@keyframes spin': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
    },
    pulse: {
      '@keyframes pulse': {
        '0%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.4,
        },
        '100%': {
          opacity: 1,
        },
      },
    },
    pulsate: {
      '@keyframes pulsate': {
        '0%': {
          transform: 'scale(0.92)',
        },
        '50%': {
          transform: 'scale(1)',
        },
        '90%': {
          transform: 'scale(0.92)',
        },
        '100%': {
          transform: 'scale(0.92)',
        },
      },
    },
    glow: {
      '@keyframes glow': {
        '0%': { boxShadow: ' 0 0 0 0em rgba(255,255,255,0.1)' },
        '50%': { opacity: 0.3 },
        '100%': { boxShadow: '0 0 2em 12em transparent' },
      },
    },
    sign: {
      '@keyframes sign': {
        '0%': {
          transform: 'rotate3d(0,0,0,0) translate(0,-2px)',
        },
        '20%': {
          transform: 'rotate3d(0,0,0,0) translate(0, 2px)',
        },
        '40%': {
          transform: 'rotate3d(4, 4, 10, -8deg) translate(6px, 2px)',
        },
        '80%': {
          transform: 'rotate3d(0,0,0,0) translate(0px, -2px)',
        },
        '100%': {
          transform: 'rotate3d(0,0,0,0) translate(0px, -2px)',
        },
      },
    },
    move: (keyframeName, startOffset, endOffset) => ({
      [`@keyframes ${keyframeName}`]: {
        '0%': {
          opacity: 0,
          transform: 'translateX(0)',
        },
        '35%, 55%': {
          opacity: 1,
          transform: `translateX(${startOffset})`,
        },
        '70%': {
          opacity: 1,
        },
        '100%': {
          opacity: 0,
          transform: `translateX(${endOffset})`,
        },
      },
    }),
    spinStart: {
      '@keyframes spin-start': {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
    spinEnd: {
      '@keyframes spin-end': {
        from: {
          transform: 'rotate(180deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
  },
}
