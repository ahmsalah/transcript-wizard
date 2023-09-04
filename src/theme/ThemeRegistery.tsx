'use client'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { createContext, useState, useMemo, useContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import NextAppDirEmotionCacheProvider from './EmotionCache'
import { getTheme } from './theme'

const ToggleThemeContext = createContext({
  toggleColorMode: () => {
    console.warn('toggleColorMode is not implemented')
  },
})

export const useToggleThemeContext = () => {
  return useContext(ToggleThemeContext)
}

export const ThemeRegistry: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode])

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ToggleThemeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ToggleThemeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  )
}
