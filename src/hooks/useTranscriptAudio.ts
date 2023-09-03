'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useTranscriptAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const setAudioTime = useCallback((timeInSeconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeInSeconds
    }
  }, [])

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

  return {
    onToggleAudio,
    isPlaying,
    onPlayAtTime,
    audioRef,
    setAudioTime,
  }
}
