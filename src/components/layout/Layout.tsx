import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo } from 'react'

export const Layout: FunctionComponent<BoxProps> = memo(({ children, ...props }) => {
  return (
    <Box
      component='main'
      minHeight='100vh'
      px={{ xs: '4.5vw', lg: '5vw' }}
      py={{ xs: 4, md: 6 }}
      {...props}
    >
      {children}
    </Box>
  )
})

Layout.displayName = 'Layout'
