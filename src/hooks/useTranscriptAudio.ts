'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Word } from '@/types/Word'

type UseTranscriptAudioParams = {
  selectedWord: Word
}

export const useTranscriptAudio = ({ selectedWord }: UseTranscriptAudioParams) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const onPlayAtTime = useCallback(async (timeInSeconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds
      await audioRef.current.play()
    }
  }, [])

  const onToggleAudio = useCallback(async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        await audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    // used for updating the isPlaying state, which controls the play/pause button in the wizard interface
    const audioElement = audioRef.current
    const handlePlay = () => {
      setIsPlaying(true)
    }
    const handlePause = () => {
      setIsPlaying(false)
    }

    if (audioElement) {
      audioElement.addEventListener('play', handlePlay)
      audioElement.addEventListener('pause', handlePause)
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', handlePlay)
        audioElement.removeEventListener('pause', handlePause)
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      // adjust audio time whenever the selected word changes
      audioRef.current.currentTime = selectedWord.start - 1
    }
  }, [selectedWord])

  return {
    onToggleAudio,
    isPlaying,
    onPlayAtTime,
    audioRef,
  }
}
