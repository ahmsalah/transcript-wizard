import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transcribe Wizard',
  description:
    'Transcribe Wizard is a platform that identifies uncertain words or phrases in audio transcriptions, highlights them, and provides an intuitive user interface for correction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
