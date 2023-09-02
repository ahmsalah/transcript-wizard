'use client'
import type { FunctionComponent } from 'react'
import { memo, useMemo } from 'react'
import type { UtterancesMap } from '@/types/UtterancesMap'
import { Flex } from '../box'
import { AudioPlayer } from '../audioPlayer'
import { Wizard } from '../wizard'
import { UtteranceItem } from '../utterances'
import { useTranscriptUtterances } from './useTranscriptUtterances'
import { useTranscriptAudio } from './useTranscriptAudio'

type TranscriptProps = {
  utterances: UtterancesMap
}

export const Transcript: FunctionComponent<TranscriptProps> = memo(({ utterances }) => {
  const { onProceed, onSelectWord, selected, selectedWordRef } = useTranscriptUtterances({
    utterances,
  })
  const selectedWord = useMemo(
    () => Array.from(utterances.values())[selected.utteranceIndex]?.words[selected.wordIndex],
    [utterances, selected],
  )
  const { onToggleAudio, onPlayAtTime, isPlaying, audioRef } = useTranscriptAudio({ selectedWord })

  return (
    <Flex column>
      <Wizard
        isPlaying={isPlaying}
        onProceed={onProceed}
        onToggleAudio={onToggleAudio}
        selectedWord={selectedWord.word}
      />

      <Flex column gap={2}>
        {Array.from(utterances.values()).map((utterance, index) => (
          <UtteranceItem
            key={utterance.id}
            {...utterance}
            onPlayAtTime={onPlayAtTime}
            onSelectWord={onSelectWord}
            ref={selectedWordRef}
            selectedUtteranceIndex={selected.utteranceIndex}
            selectedWordIndex={selected.wordIndex}
            utteranceIndex={index}
          />
        ))}
      </Flex>
      <AudioPlayer
        ref={audioRef}
        src='https://wondercraft-podcast-assets.s3.eu-west-1.amazonaws.com/doac_17_08_trimmed.mp3'
      />
    </Flex>
  )
})

Transcript.displayName = 'Transcript'
