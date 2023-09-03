import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { Sidebar } from '../sidebar'
import { Flex } from '../box'

export type LayoutProps = BoxProps & {
  withSidebar?: boolean
}

export const Layout: FunctionComponent<LayoutProps> = memo(
  ({ children, withSidebar, ...props }) => {
    return (
      <Flex sx={{ minHeight: '100vh' }}>
        {!!withSidebar && <Sidebar />}

        <Box
          component='main'
          flex={1}
          minHeight='100vh'
          px={{ xs: '4.5vw', lg: '3vw', xl: '6vw' }}
          py={{ xs: 4, md: 6 }}
          {...props}
        >
          {children}
        </Box>
      </Flex>
    )
  },
)

Layout.displayName = 'Layout'
