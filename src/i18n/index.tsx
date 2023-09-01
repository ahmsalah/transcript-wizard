'use client'
import Polyglot from 'node-polyglot'
import type { FunctionComponent, PropsWithChildren } from 'react'
import { useContext, createContext, useMemo, useCallback } from 'react'
import en from './en.json'

export type I18nKey = keyof typeof en

export type TranslateFn = (
  key: I18nKey,
  values?: Record<string, string | number | undefined>,
) => string

export const I18NContext = createContext<{
  t: TranslateFn
}>({
  t: () => '',
})

export const useI18n = () => {
  return useContext(I18NContext)
}

export const I18NContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const polyglot = useMemo(() => {
    const polyglotInstance = new Polyglot()
    polyglotInstance.extend(en)
    return polyglotInstance
  }, [])

  const translate: TranslateFn = useCallback(
    (key, values) => {
      const t = polyglot.t(key, values)

      return t
    },
    [polyglot],
  )

  const value = useMemo(() => ({ t: translate, translate }), [translate])

  return <I18NContext.Provider value={value}>{children}</I18NContext.Provider>
}
