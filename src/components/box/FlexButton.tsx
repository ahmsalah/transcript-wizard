import { memo, forwardRef } from 'react'
import type { ButtonBaseProps } from '@mui/material'
import { ButtonBase } from '@mui/material'
import type { FlexProps } from './Flex'
import { Flex } from './Flex'

export type FlexButtonProps = Omit<FlexProps, 'onClick'> & ButtonBaseProps

export const FlexButton = memo(
  forwardRef<unknown, FlexButtonProps>((props, ref?) => {
    //@ts-expect-error suppress types incompatible error
    return <Flex ref={ref} {...props} component={ButtonBase} />
  }),
)

FlexButton.displayName = 'FlexButton'
