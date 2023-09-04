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
  isIconOnly?: boolean
  iconSize?: IconProps['size']
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = memo(
  ({ label, icon, isSelected, isIconOnly, iconSize = '2.3rem', children, sx, ...props }) => {
    const isUp900 = useMediaQuery('(min-width:900px)')

    return (
      <Tooltip
        placement={isIconOnly && isUp900 ? 'top' : 'right'}
        title={!isUp900 || isIconOnly ? label : null}
      >
        <Flex
          alignCenter
          gap={2}
          {...props}
          sx={{
            borderRadius: 2,
            width: isIconOnly ? undefined : 1,
            justifyContent: { xs: 'center', md: isIconOnly ? 'center' : 'flex-start' },
            py: 1.5,
            px: isIconOnly ? 1.5 : { xs: 0, md: 3 },
            transition: 'opacity 0.2s',
            zIndex: 1,
            color: 'inherit',
            opacity: 0.9,
            '&:hover': {
              color: 'primary.onContainer',
              opacity: 1,
              bgcolor: 'action.hover',
            },
            ...(isSelected && {
              color: 'primary.onContainer',
              opacity: 1,
            }),
            ...sx,
          }}
        >
          {children}
          {icon != null && <Icon icon={icon} size={iconSize} />}
          {!!label && !isIconOnly && (
            <Typography
              fontWeight='600'
              sx={{ display: { xs: 'none', md: 'block' } }}
              textTransform='none'
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
