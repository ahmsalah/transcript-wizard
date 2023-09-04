/**
 * Learn more about palette customization
 * https://mui.com/material-ui/customization/palette/
 *
 * Default theme palette values provided by MUI
 * https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
 */

import type { PaletteOptions } from '@mui/material/styles'

/* eslint-disable @typescript-eslint/consistent-type-definitions 
-- module augmentation must be in interface  */
declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    light: string
    dark: string
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export const getPalette = (mode: 'light' | 'dark'): PaletteOptions =>
  mode === 'dark'
    ? {
        mode,
        primary: {
          main: '#FFFFFF',
        },
        secondary: { main: '#14b8a6' },
        background: {
          default: 'rgb(16, 14, 19)',
        },
      }
    : {
        mode,
        primary: {
          main: '#212121',
        },
        secondary: { main: '#14b8a6' },
        background: {
          paper: '#FFFFFF',
          default: 'rgb(243, 244, 248)',
          dark: '#212121',
        },
      }
