'use client'
import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { Box, Fade } from '@mui/material'
import { useTranscriptAudio, useTranscriptUtterances } from '@/hooks'
import type { Utterance } from '@/types/Utterance'
import { Flex } from '../box'
import { AudioPlayer } from '../audioPlayer'
import { Wizard } from '../wizard'
import { UtteranceItem } from '../utterances'
import { Splash } from '../splash'

type TranscriptProps = {
  utterances: Utterance[]
}

export const Transcript: FunctionComponent<TranscriptProps> = memo(
  ({ utterances: utterancesBase }) => {
    const { onToggleAudio, onPlayAtTime, isPlaying, audioRef, setAudioTime } = useTranscriptAudio()
    const {
      utterances,
      isLoading,
      onProceed,
      onSelectWord,
      selected,
      selectedWord,
      selectedWordRef,
      onSaveWord,
      lowConfidenceWordsCount,
      highlightedUtteranceIndex,
      highlightedUtteranceRef,
    } = useTranscriptUtterances({
      utterancesBase,
      setAudioTime,
      audioRef,
    })

    return (
      <Flex column position='relative'>
        {isLoading ? <Splash /> : null}

        <Wizard
          isPlaying={isPlaying}
          isTranscriptLoading={isLoading}
          lowConfidenceWordsCount={lowConfidenceWordsCount}
          onProceed={onProceed}
          onSaveWord={onSaveWord}
          onToggleAudio={onToggleAudio}
          selectedUtteranceIndex={selected.utteranceIndex}
          selectedWord={selectedWord.word}
          selectedWordIndex={selected.wordIndex}
        />

        <Fade in={!isLoading} timeout={500}>
          <Flex column gap={2}>
            {utterances.map((utterance, index) => {
              const isHighlighted = highlightedUtteranceIndex === index
              return (
                <Box key={utterance.id} ref={isHighlighted ? highlightedUtteranceRef : null}>
                  <UtteranceItem
                    {...utterance}
                    isHighlighted={isHighlighted}
                    onPlayAtTime={onPlayAtTime}
                    onSelectWord={onSelectWord}
                    ref={selectedWordRef}
                    selectedUtteranceIndex={selected.utteranceIndex}
                    selectedWordIndex={selected.wordIndex}
                    utteranceIndex={index}
                  />
                </Box>
              )
            })}
          </Flex>
        </Fade>
        <AudioPlayer
          ref={audioRef}
          src='https://wondercraft-podcast-assets.s3.eu-west-1.amazonaws.com/doac_17_08_trimmed.mp3'
        />
      </Flex>
    )
  },
)

Transcript.displayName = 'Transcript'
