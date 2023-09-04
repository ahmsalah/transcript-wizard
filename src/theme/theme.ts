import { getComponents } from './components'
import { getPalette } from './palette'
import { typography } from './typography'
import { mixins } from './mixins'

declare module '@mui/material/styles/createTheme' {}

export const getTheme = (mode: 'light' | 'dark') => ({
  components: getComponents(mode),
  palette: getPalette(mode),
  typography,
  mixins,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  shape: {
    borderRadius: 4,
  },
})
