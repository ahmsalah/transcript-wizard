'use client'
import { Button, Input, Paper, Typography } from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo, useCallback } from 'react'
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded'
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { Controller, useForm } from 'react-hook-form'
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

    const { handleSubmit, control } = useForm<WizardFormType>({
      mode: 'onChange',
      defaultValues: {
        value: selectedWord,
      },
    })

    const onSubmit = useCallback(({ value }: WizardFormType) => {
      console.log(value)
    }, [])

    return (
      <Paper
        sx={{
          position: 'fixed',
          right: '5%',
          top: '40%',
          width: 300,
          height: 260,
          p: 3,
        }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Flex alignCenter column gap={3} height={1}>
            <Typography>{t('words_need_your_attention', { smart_count: 222 })}</Typography>

            <Flex gap={2}>
              <Typography fontWeight='bold' variant='h4'>
                {selectedWord}
              </Typography>
              <Button type='submit'>{t('save')}</Button>
            </Flex>

            <Controller
              control={control}
              name='value'
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  // id=''
                  fullWidth
                  onBlur={onBlur}
                  onChange={onChange}
                  sx={{ mb: 3 }}
                  value={value}
                />
              )}
            />

            <Flex gap={2} mt='auto'>
              <Button
                endIcon={
                  isPlaying ? <PauseCircleOutlineRoundedIcon /> : <PlayCircleOutlineRoundedIcon />
                }
                onClick={onToggleAudio}
                variant='outlined'
              >
                {t(isPlaying ? 'pause' : 'play')}
              </Button>
              <Button endIcon={<ChevronRightRoundedIcon />} onClick={onProceed} variant='contained'>
                {t('next')}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Paper>
    )
  },
)

Wizard.displayName = 'Wizard'
