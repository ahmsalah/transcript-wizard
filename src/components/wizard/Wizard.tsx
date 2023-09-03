'use client'
import {
  Button,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  OutlinedInput,
  Tooltip,
  Typography,
  Zoom,
  Box,
} from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
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
import type { OnSaveWord } from '@/hooks'
import { Flex } from '../box'
import { DraggablePaper } from '../draggablePaper/DraggablePaper'

type WizardProps = {
  onProceed: () => void
  onToggleAudio: () => void
  selectedWord: string
  isPlaying: boolean
  selectedUtteranceIndex: number
  selectedWordIndex: number
  onSaveWord: OnSaveWord
  lowConfidenceWordsCount: number
  isTranscriptLoading: boolean
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
    onSaveWord,
    selectedUtteranceIndex,
    selectedWordIndex,
    lowConfidenceWordsCount,
    isTranscriptLoading,
  }) => {
    const { t } = useI18n()
    const [collapseIn, setCollapseIn] = useState(false)

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

    const onSubmit = useCallback(
      ({ value }: WizardFormType) => {
        onSaveWord({
          newWord: value,
          utteranceIndex: selectedUtteranceIndex,
          wordIndex: selectedWordIndex,
        })
      },
      [onSaveWord, selectedUtteranceIndex, selectedWordIndex],
    )

    const onReset = useCallback(() => {
      reset({ value: selectedWord })
    }, [selectedWord, reset])

    useEffect(() => {
      onReset()
    }, [onReset])

    useEffect(() => {
      if (!isTranscriptLoading) {
        setTimeout(() => {
          setCollapseIn(true)
        }, 2000)
      }
    }, [isTranscriptLoading])

    return (
      <Zoom appear in={collapseIn} timeout={600}>
        <Box
          sx={{
            position: 'fixed',
            right: { xs: '5%', sm: '4%', lg: '5%', xl: '10%' },
            bottom: { xs: 120, lg: '36%' },
            zIndex: 2,
            left: { xs: '5%', sm: 'unset' },
          }}
        >
          <DraggablePaper
            sx={{
              py: 3,
              px: 4,
              minWidth: { sm: 350 },
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing',
              },
            }}
          >
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <Flex alignCenter column gap={{ xs: 2, md: 4 }} height={1} id='draggable-handle'>
                <BoltRounded sx={{ fontSize: '4rem', mb: -2 }} />
                <Typography>
                  {t('words_need_your_attention', { smart_count: lowConfidenceWordsCount })}
                </Typography>

                <Typography fontWeight='bold' variant='h4'>
                  {selectedWord}
                </Typography>

                <Controller
                  control={control}
                  name='value'
                  render={({ field }) => (
                    <FormControl className='no-drag'>
                      <OutlinedInput
                        {...field}
                        endAdornment={
                          <>
                            <Fade appear in={isDirty}>
                              <Tooltip title={t('reset')}>
                                <IconButton onClick={onReset} size='small'>
                                  <HistoryRounded />
                                </IconButton>
                              </Tooltip>
                            </Fade>

                            <Tooltip title={t('save')}>
                              <IconButton onClick={handleSubmit(onSubmit)} size='small'>
                                <CheckRounded />
                              </IconButton>
                            </Tooltip>
                          </>
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
                <Flex className='no-drag' gap={2} mt={1}>
                  <Button
                    endIcon={
                      isPlaying ? <PauseCircleOutlineRounded /> : <PlayCircleOutlineRounded />
                    }
                    onClick={onToggleAudio}
                    size='large'
                    variant='outlined'
                  >
                    {t(isPlaying ? 'pause' : 'play')}
                  </Button>
                  {isDirty ? (
                    <Button
                      endIcon={<CheckRounded />}
                      size='large'
                      type='submit'
                      variant='contained'
                    >
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
          </DraggablePaper>
        </Box>
      </Zoom>
    )
  },
)

Wizard.displayName = 'Wizard'
