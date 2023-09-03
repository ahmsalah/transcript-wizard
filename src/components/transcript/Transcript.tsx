'use client'
import type { FunctionComponent } from 'react'
import { memo, useMemo } from 'react'
import { useTranscriptAudio, useTranscriptUtterances } from '@/hooks'
import type { Utterance } from '@/types/Utterance'
import { Flex } from '../box'
import { AudioPlayer } from '../audioPlayer'
import { Wizard } from '../wizard'
import { UtteranceItem } from '../utterances'

type TranscriptProps = {
  utterances: Utterance[]
}

export const Transcript: FunctionComponent<TranscriptProps> = memo(({ utterances }) => {
  const { onProceed, onSelectWord, selected, selectedWordRef, onSubmitWord } =
    useTranscriptUtterances({
      utterances,
    })
  const selectedWord = useMemo(
    () => utterances[selected.utteranceIndex]?.words[selected.wordIndex],
    [utterances, selected],
  )
  const { onToggleAudio, onPlayAtTime, isPlaying, audioRef } = useTranscriptAudio({ selectedWord })

  return (
    <Flex column>
      <Wizard
        isPlaying={isPlaying}
        onProceed={onProceed}
        onSubmitWord={onSubmitWord}
        onToggleAudio={onToggleAudio}
        selectedUtteranceIndex={selected.utteranceIndex}
        selectedWord={selectedWord.word}
        selectedWordIndex={selected.wordIndex}
      />

      <Flex column gap={2}>
        {utterances.map((utterance, index) => (
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
