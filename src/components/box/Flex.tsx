import { memo, forwardRef } from 'react'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

export type FlexProps = BoxProps & {
  inline?: boolean
  column?: boolean
  wrap?: boolean
  justifyCenter?: boolean
  alignCenter?: boolean
}

export const Flex = memo(
  forwardRef<unknown, FlexProps>(
    ({ inline, column, wrap, justifyCenter, alignCenter, ...props }, ref?) => {
      return (
        <Box
          alignItems={alignCenter ? 'center' : 'stretch'}
          display={inline ? 'inline-flex' : 'flex'}
          flexDirection={column ? 'column' : undefined}
          flexWrap={wrap ? 'wrap' : undefined}
          justifyContent={justifyCenter ? 'center' : 'flex-start'}
          ref={ref}
          {...props}
        />
      )
    },
  ),
)

Flex.displayName = 'Flex'
