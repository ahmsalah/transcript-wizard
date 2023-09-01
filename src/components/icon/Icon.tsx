import type { PropsWithChildren } from 'react'
import React, { memo, forwardRef } from 'react'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import type { IconProps as IconsAXProps } from 'iconsax-react'

export type IconProps = BoxProps & {
  size?: BoxProps['fontSize']
  color?: BoxProps['color']
  icon: React.ElementType
} & Pick<IconsAXProps, 'variant'>

export const Icon = memo(
  forwardRef<unknown, PropsWithChildren<IconProps>>(
    ({ icon, size = '2.3rem', sx, color, variant, ...props }, ref?) => {
      return (
        <Box
          className='icon-root'
          color={color}
          fontSize={size}
          {...props}
          component={icon}
          ref={ref}
          sx={{ width: '1em', height: '1em', ...sx }}
          variant={variant}
        />
      )
    },
  ),
)

Icon.displayName = 'Icon'
