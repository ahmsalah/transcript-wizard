'use client'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { createContext, useState, useMemo, useContext, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getFromLocalStorage, saveToLocalStorage } from '@/utils'
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

type PaletteMode = 'light' | 'dark'

export const ThemeRegistry: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('light')

  useEffect(() => {
    const cachedColorMode = getFromLocalStorage<PaletteMode>('palette-color-mode')
    if (cachedColorMode) {
      setMode(cachedColorMode)
    }
  }, [])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light'

          saveToLocalStorage('palette-color-mode', newMode)
          return newMode
        })
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
