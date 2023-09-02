'use client'
import type { FunctionComponent } from 'react'
import { memo, useCallback, useRef } from 'react'
import { AudioPlayer } from '../audioPlayer'
import { Utterances } from '../utterances'
import { Flex } from '../box'

export const Transcript: FunctionComponent = memo(() => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const seekToTime = useCallback(async (timeInSeconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds
      await audioRef.current.play()
    }
  }, [])

  return (
    <Flex column>
      <Utterances seekToTime={seekToTime} />
      <AudioPlayer
        ref={audioRef}
        src='https://wondercraft-podcast-assets.s3.eu-west-1.amazonaws.com/doac_17_08_trimmed.mp3'
      />
    </Flex>
  )
})

Transcript.displayName = 'Transcript'
