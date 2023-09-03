import { UserSquare, VideoPlay, ClipboardText, Microphone, AudioSquare } from 'iconsax-react'
import type { I18nKey } from '@/i18n'
import type { IconProps } from '../icon'

export type BaseTab = {
  path: string
  label: I18nKey
}

export type AppTab = BaseTab & {
  icon: IconProps['icon']
  isDisabled: boolean
  isEnabled: boolean
}

export const appTabs: AppTab[] = [
  {
    path: '/',
    label: 'transcriptions',
    icon: ClipboardText,
    isDisabled: false,
    isEnabled: true,
  },
  {
    path: '/podcasts',
    label: 'podcasts',
    icon: Microphone,
    isDisabled: false,
    isEnabled: true,
  },
  {
    path: '/media',
    label: 'media',
    icon: VideoPlay,
    isDisabled: false,
    isEnabled: true,
  },
  {
    path: '/audio',
    label: 'audio',
    icon: AudioSquare,
    isDisabled: false,
    isEnabled: true,
  },
  {
    path: '/profile',
    label: 'profile',
    icon: UserSquare,
    isDisabled: false,
    isEnabled: true,
  },
]
