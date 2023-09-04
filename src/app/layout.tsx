import type { Metadata } from 'next'
import { I18NContextProvider } from '@/i18n'
import { ThemeRegistry } from '@/theme'
import { Layout } from '@/components'

export const metadata: Metadata = {
  title: 'Transcript Wizard',
  description:
    'Transcript Wizard is a platform that identifies uncertain words or phrases in audio transcriptions, highlights them, and provides an intuitive user interface for correction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <I18NContextProvider>
          <ThemeRegistry>
            <Layout withSidebar>{children}</Layout>
          </ThemeRegistry>
        </I18NContextProvider>
      </body>
    </html>
  )
}
