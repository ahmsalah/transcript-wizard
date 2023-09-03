'use client'
import { Button, Fade, IconButton, OutlinedInput, Paper, Tooltip, Typography } from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo, useCallback, useEffect } from 'react'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded'
import { Controller, useForm } from 'react-hook-form'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import { useI18n } from '@/i18n'
import { Flex } from '../box'

type WizardProps = {
  onProceed: () => void
  onToggleAudio: () => void
  selectedWord: string
  isPlaying: boolean
}

type WizardFormType = {
  value: string
}

export const Wizard: FunctionComponent<WizardProps> = memo(
  ({ selectedWord, onProceed, onToggleAudio, isPlaying }) => {
    const { t } = useI18n()

    const {
      handleSubmit,
      control,
      reset,

      formState: { isDirty },
    } = useForm<WizardFormType>({
      mode: 'onChange',

      defaultValues: {
        value: selectedWord,
      },
    })

    const onReset = useCallback(() => {
      reset({ value: selectedWord })
    }, [selectedWord])

    const onSubmit = useCallback(
      ({ value }: WizardFormType) => {
        console.log(value)
        onProceed()
      },
      [onProceed],
    )

    useEffect(() => {
      onReset()
    }, [onReset])

    return (
      <Paper
        sx={{
          position: 'fixed',
          right: '5%',
          top: '40%',
          py: 3,
          px: 4,
          minWidth: { md: 400 },
        }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Flex alignCenter column gap={4} height={1}>
            <BoltRoundedIcon sx={{ fontSize: '4rem', mb: -2 }} />
            <Typography>{t('words_need_your_attention', { smart_count: 222 })}</Typography>

            <Typography fontWeight='bold' variant='h4'>
              {selectedWord}
            </Typography>

            <Controller
              control={control}
              name='value'
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  endAdornment={
                    <Fade in={isDirty}>
                      <Tooltip title={t('reset')}>
                        <IconButton onClick={onReset} size='small'>
                          <HistoryRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Fade>
                  }
                  fullWidth
                  sx={{ textAlign: 'center', width: 1 }}
                />
              )}
            />
            <Flex gap={2} mt={1}>
              <Button
                endIcon={
                  isPlaying ? <PauseCircleOutlineRoundedIcon /> : <PlayCircleOutlineRoundedIcon />
                }
                onClick={onToggleAudio}
                size='large'
                variant='outlined'
              >
                {t(isPlaying ? 'pause' : 'play')}
              </Button>
              {isDirty ? (
                <Button
                  endIcon={<CheckRoundedIcon />}
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  {t('save')}
                </Button>
              ) : (
                <Button
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={onProceed}
                  size='large'
                  variant='contained'
                >
                  {t('next')}
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </Paper>
    )
  },
)

Wizard.displayName = 'Wizard'
