'use client'
import {
  Button,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo, useCallback, useEffect } from 'react'
import {
  PlayCircleOutlineRounded,
  PauseCircleOutlineRounded,
  ChevronRightRounded,
  CheckRounded,
  HistoryRounded,
  BoltRounded,
} from '@mui/icons-material'
import { Controller, useForm } from 'react-hook-form'
import { useI18n } from '@/i18n'
import type { OnSubmitWord } from '@/hooks'
import { Flex } from '../box'

type WizardProps = {
  onProceed: () => void
  onToggleAudio: () => void
  selectedWord: string
  isPlaying: boolean
  selectedUtteranceIndex: number
  selectedWordIndex: number
  onSubmitWord: OnSubmitWord
}

type WizardFormType = {
  value: string
}

export const Wizard: FunctionComponent<WizardProps> = memo(
  ({
    selectedWord,
    onProceed,
    onToggleAudio,
    isPlaying,
    onSubmitWord,
    selectedUtteranceIndex,
    selectedWordIndex,
  }) => {
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
    }, [selectedWord, reset])

    const onSubmit = useCallback(
      ({ value }: WizardFormType) => {
        console.log(value)
        // onProceed()
        onSubmitWord({
          newWord: value,
          utteranceIndex: selectedUtteranceIndex,
          wordIndex: selectedWordIndex,
        })
      },
      [onSubmitWord, selectedUtteranceIndex, selectedWordIndex],
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
            <BoltRounded sx={{ fontSize: '4rem', mb: -2 }} />
            <Typography>{t('words_need_your_attention', { smart_count: 222 })}</Typography>

            <Typography fontWeight='bold' variant='h4'>
              {selectedWord}
            </Typography>

            <Controller
              control={control}
              name='value'
              render={({ field }) => (
                <FormControl>
                  <OutlinedInput
                    {...field}
                    endAdornment={
                      <Fade in={isDirty}>
                        <Tooltip title={t('reset')}>
                          <IconButton onClick={onReset} size='small'>
                            <HistoryRounded />
                          </IconButton>
                        </Tooltip>
                      </Fade>
                    }
                    fullWidth
                    sx={{ textAlign: 'center', width: 1 }}
                  />
                  <FormHelperText id='my-helper-text'>
                    {t('press_enter_key_to_save')}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <Flex gap={2} mt={1}>
              <Button
                endIcon={isPlaying ? <PauseCircleOutlineRounded /> : <PlayCircleOutlineRounded />}
                onClick={onToggleAudio}
                size='large'
                variant='outlined'
              >
                {t(isPlaying ? 'pause' : 'play')}
              </Button>
              {isDirty ? (
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
          </Flex>
        </form>
      </Paper>
    )
  },
)

Wizard.displayName = 'Wizard'
