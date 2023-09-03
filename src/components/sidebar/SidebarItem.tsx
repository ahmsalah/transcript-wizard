import { Tooltip, Typography, useMediaQuery } from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo } from 'react'
import type { FlexProps } from '../box'
import { Flex } from '../box'
import type { IconProps } from '../icon'
import { Icon } from '../icon'

type SidebarItemProps = FlexProps & {
  label: string | null | undefined
  icon?: IconProps['icon']
  isSelected?: boolean
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = memo(
  ({ label, icon, isSelected, children, sx, ...props }) => {
    const isUp900 = useMediaQuery('(min-width:900px)')

    return (
      <Tooltip placement='right' title={isUp900 ? null : label}>
        <Flex
          alignCenter
          gap={2}
          {...props}
          sx={{
            borderRadius: 2,
            width: 1,
            justifyContent: { xs: 'center', md: 'flex-start' },
            py: 1.5,
            px: { xs: 0, md: 3 },
            transition: 'opacity 0.2s',
            zIndex: 1,
            color: 'inherit',
            opacity: 0.9,
            '&:hover': {
              color: 'primary.onContainer',
              opacity: 1,
              bgcolor: 'action.hover',
            },
            '&& svg': {
              fontSize: '2.2rem',
              mb: 0,
            },
            ...(isSelected && {
              color: 'primary.onContainer',
              opacity: 1,
            }),
            ...sx,
          }}
        >
          {children}
          {icon != null && <Icon icon={icon} size='2.2rem' />}
          {!!label && (
            <Typography
              fontWeight='600'
              sx={{ display: { xs: 'none', md: 'block' } }}
              textTransform='none'
              // whiteSpace='pre-line'
            >
              {label}
            </Typography>
          )}
        </Flex>
      </Tooltip>
    )
  },
)

SidebarItem.displayName = 'SidebarItem'
