'use client'
import { Typography, Zoom, Box } from '@mui/material'
import type { FunctionComponent } from 'react'
import { memo, useEffect, useState } from 'react'
import { BoltRounded } from '@mui/icons-material'
import { useI18n } from '@/i18n'
import type { OnSaveWord } from '@/hooks'
import { Flex } from '../box'
import { DraggablePaper } from '../draggablePaper/DraggablePaper'
import { WizardFormInput } from './WizardFormInput'
import { WizardActions } from './WizardActions'
import { useWizardForm } from './Wizard.form'

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

    const { onSubmit, onReset, control, hasFormValueChanged } = useWizardForm({
      initialValue: selectedWord,
      onSave: (newValue) => {
        onSaveWord({
          newWord: newValue,
          utteranceIndex: selectedUtteranceIndex,
          wordIndex: selectedWordIndex,
        })
      },
    })

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
            zIndex: (theme) => theme.zIndex.drawer + 1,
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
            <form noValidate onSubmit={onSubmit}>
              <Flex alignCenter column gap={{ xs: 2, md: 4 }} height={1} id='draggable-handle'>
                <BoltRounded sx={{ fontSize: '4rem', mb: -2 }} />
                <Typography>
                  {t('words_need_your_attention', { smart_count: lowConfidenceWordsCount })}
                </Typography>

                <Typography fontWeight='bold' variant='h4'>
                  {selectedWord}
                </Typography>

                <WizardFormInput
                  control={control}
                  hasFormValueChanged={hasFormValueChanged}
                  onReset={onReset}
                  onSubmit={onSubmit}
                />
                <WizardActions
                  hasFormValueChanged={hasFormValueChanged}
                  isPlaying={isPlaying}
                  onProceed={onProceed}
                  onToggleAudio={onToggleAudio}
                />
              </Flex>
            </form>
          </DraggablePaper>
        </Box>
      </Zoom>
    )
  },
)

Wizard.displayName = 'Wizard'
