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
  interface TypeAction {
    disabledLight: string
    hoverLight: string
  }

  interface TypeBackground {
    light: string
    dark: string
    grey: string
    variable: string[]
  }

  interface SimplePaletteColorOptions {
    light?: string
    main: string
    dark?: string
    contrastText?: string
  }
}
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export const palette: PaletteOptions = {
  primary: {
    main: '#212121',
  },
  secondary: { main: '#14b8a6' },
  background: {
    paper: '#FFFFFF',
    default: 'rgb(243, 244, 248)',
    light: 'rgba(255, 255, 255, 0.15)',
    dark: '#00271c',
  },
  action: {
    disabledLight: 'rgba(255, 255, 255, 0.26)',
    hoverLight: 'rgba(255, 255, 255, 0.30)',
  },
}
