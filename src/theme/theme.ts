import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'
import { mixins } from './mixins'

declare module '@mui/material/styles/createTheme' {}

const customTheme = createTheme({
  components,
  palette,
  typography,
  mixins,
  direction: 'ltr',
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  shape: {
    borderRadius: 4,
  },
})

export const theme = responsiveFontSizes(customTheme, { disableAlign: true })
