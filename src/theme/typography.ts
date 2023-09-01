/**
 * Learn more about typography customization
 * https://mui.com/material-ui/customization/typography/
 *
 * Default theme typography values provided by MUI
 * https://mui.com/material-ui/customization/default-theme/?expand-path=$.typography
 */
import { Manrope } from 'next/font/google'
import type { TypographyOptions } from '@mui/material/styles/createTypography'

declare module '@mui/material/styles/createTypography' {}

const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const typography: TypographyOptions = {
  fontFamily: manrope.style.fontFamily,
  htmlFontSize: 10,
  h1: {
    fontSize: '2.8rem',
    fontWeight: '700',
  },
  h2: {
    fontSize: '2.8rem',
    fontWeight: '500',
  },
  h3: {
    fontSize: '2.4rem',
    fontWeight: '500',
  },
  h4: {
    fontSize: '2rem',
    fontWeight: '400',
  },
  h5: {
    fontSize: '1.8rem',
    fontWeight: '500',
  },
  h6: {
    fontSize: '1.54rem',
    fontWeight: '500',
  },
  body1: {
    fontSize: '1.54rem',
    fontWeight: '500',
  },
  body2: {
    fontSize: '1.36rem',
    fontWeight: '500',
  },
  caption: {
    fontWeight: '500',
  },
}
