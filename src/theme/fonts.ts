import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'

export const nothingYouCouldDoFont = localFont({
  src: '../assets/fonts/NothingYouCouldDo-Regular.ttf',
})

export const manropeFont = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})
