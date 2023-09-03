'use client'
import type { FunctionComponent } from 'react'
import { memo } from 'react'
import type { Theme, SxProps } from '@mui/material'
import { Drawer, Tabs, Tab, Badge, useMediaQuery, Avatar, Typography } from '@mui/material'
import { Notification as NotificationIcon } from 'iconsax-react'
import { useI18n } from '@/i18n'
import { Flex, FlexButton } from '../box'
import { Icon } from '../icon'
import { SidebarItem } from './SidebarItem'
import { appTabs } from './Sidebar.tabs'

const tabIndex = 0
const currentUser = {
  name: 'Jules Winnfield',
  avatar:
    'https://www.notion.so/signed/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ff993230d-8957-44db-a873-af2f26d2d410%2F38668991-1be3-4af9-8e9a-ae42d81679b2%2Fpulp-fiction-2.jpg?id=8291cd27-2de0-4d64-bca8-957730948c1a&table=block&spaceId=f993230d-8957-44db-a873-af2f26d2d410&name=pulp-fiction-2.jpg&userId=34709d7a-8713-4c42-beab-d7256d46352e&cache=v2',
}

export const drawerWidthMd = 220
export const drawerWidthSm = 65

const drawerStyles: SxProps<Theme> = ({ transitions }) => ({
  zIndex: 1100,
  flexShrink: 0,
  whiteSpace: 'nowrap',

  '&, & .MuiDrawer-paper': {
    py: 2,
    overflowX: 'hidden',
    width: { xs: 0, sm: drawerWidthSm, md: drawerWidthMd },
    transition: {
      sm: transitions.create('width', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
      md: transitions.create('width', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  },
})

const tabsStyles: SxProps<Theme> = ({ transitions }) => ({
  p: { xs: 1, md: 2 },
  '& .MuiTabScrollButton-root.Mui-disabled': {
    height: 0,
  },
  '& .MuiTabScrollButton-root': {
    transition: transitions.create('height', { duration: transitions.duration.shorter }),
  },
  '& .MuiTabs-indicator': {
    borderRadius: 2,
    width: '100%',
    right: 'unset',
    left: 0,
    zIndex: 0,
    bgcolor: 'action.selected',
  },
})

const tabStyles: SxProps<Theme> = {
  minWidth: 'initial',
  minHeight: 'initial',
  alignItems: 'flex-start',
  p: 0,
  m: 0,
  borderRadius: 2,
  my: 0.5,
}

export const Sidebar: FunctionComponent = memo(() => {
  const matches = useMediaQuery('(max-width:900px)')
  const { t } = useI18n()

  return (
    <Drawer sx={drawerStyles} variant='permanent'>
      <Flex
        alignCenter
        gap={2}
        justifyCenter
        sx={{
          pt: 4,
          pb: 3.5,
          px: { xs: 1, md: 2 },
        }}
      >
        <Typography fontFamily="'Nothing You Could Do', Manrope" fontWeight='bold' variant='h3'>
          {matches ? (
            'TW'
          ) : (
            <>
              Transcript
              <br />
              Wizard
            </>
          )}
        </Typography>
      </Flex>
      <Tabs
        aria-label='tabs'
        indicatorColor='secondary'
        orientation='vertical'
        scrollButtons='auto'
        sx={tabsStyles}
        value={tabIndex}
        variant='scrollable'
      >
        {appTabs.map(({ icon, label, isDisabled }, index) => (
          <Tab
            disableTouchRipple
            disabled={isDisabled}
            key={index}
            label={<SidebarItem icon={icon} isSelected={index === tabIndex} label={t(label)} />}
            sx={tabStyles}
            value={index}
          />
        ))}
      </Tabs>

      <Flex column gap={1} mb={2} mt='auto' p={{ xs: 1, md: 2 }}>
        <FlexButton disableTouchRipple>
          <SidebarItem label={t('notifications')}>
            <Badge color='error' overlap='circular' variant='dot'>
              <Icon icon={NotificationIcon} />
            </Badge>
          </SidebarItem>
        </FlexButton>

        <FlexButton disableTouchRipple>
          <SidebarItem label={currentUser.name} sx={{ px: { xs: 0, md: 1.5 }, gap: 1.5 }}>
            <Avatar alt={currentUser.name} src={currentUser.avatar} />
          </SidebarItem>
        </FlexButton>
      </Flex>
    </Drawer>
  )
})

Sidebar.displayName = 'Sidebar'
