'use client'
import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { Button } from '@mui/material'
import {
  PlayCircleOutlineRounded,
  PauseCircleOutlineRounded,
  ChevronRightRounded,
  CheckRounded,
} from '@mui/icons-material'
import { useI18n } from '@/i18n'
import { Flex } from '../box'

type WizardActionsProps = {
  onProceed: () => void
  onToggleAudio: () => void
  isPlaying: boolean
  hasFormValueChanged: boolean
}

export const WizardActions: FunctionComponent<WizardActionsProps> = memo(
  ({ isPlaying, hasFormValueChanged, onProceed, onToggleAudio }) => {
    const { t } = useI18n()

    return (
      <Flex className='no-drag' gap={2} mt={1}>
        <Button
          endIcon={isPlaying ? <PauseCircleOutlineRounded /> : <PlayCircleOutlineRounded />}
          onClick={onToggleAudio}
          size='large'
          variant='outlined'
        >
          {t(isPlaying ? 'pause' : 'play')}
        </Button>
        {hasFormValueChanged ? (
          <Button endIcon={<CheckRounded />} size='large' type='submit' variant='contained'>
            {t('save')}
          </Button>
        ) : (
          <Button
            endIcon={<ChevronRightRounded />}
            onClick={onProceed}
            size='large'
            variant='contained'
          >
            {t('next')}
          </Button>
        )}
      </Flex>
    )
  },
)

WizardActions.displayName = 'WizardActions'
