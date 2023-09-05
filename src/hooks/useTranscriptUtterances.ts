'use client'
import type { MutableRefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import type { Utterance } from '@/types/Utterance'
import {
  replaceAtIndex,
  updatePunctuatedWord,
  getFromLocalStorageAsync,
  saveToLocalStorageAsync,
  getNextLowConfidenceWord,
  calculateLowConfidenceWordsCount,
} from '@/utils'

type OnSelectWordParams = {
  utteranceIndex: number
  wordIndex: number
}
export type OnSelectWord = (params: OnSelectWordParams) => void

type OnSaveWordParams = OnSelectWordParams & {
  newWord: string
}
export type OnSaveWord = (params: OnSaveWordParams) => void

type UseTranscriptUtterancesParams = {
  utterancesBase: Utterance[]
  setAudioTime: (timeInSeconds: number) => void
  audioRef: MutableRefObject<HTMLAudioElement | null>
}

export const useTranscriptUtterances = ({
  utterancesBase,
  setAudioTime,
  audioRef,
}: UseTranscriptUtterancesParams) => {
  const isUp900 = useMediaQuery('(min-width:900px)')
  const selectedWordRef = useRef<HTMLDivElement | null>(null)
  const highlightedUtteranceRef = useRef<HTMLDivElement | null>(null)
  const [utterances, setUtterances] = useState(utterancesBase)
  const [isLoading, setIsLoading] = useState(true)
  const [highlightedUtteranceIndex, setHighlightedUtteranceIndex] = useState(0)
  const [selected, setSelected] = useState<{
    utteranceIndex: number
    wordIndex: number
  }>({
    utteranceIndex: 0,
    wordIndex: 0,
  })

  const getUtterancesFromLocaleStorage = useCallback(async () => {
    const cachedUtterances = await getFromLocalStorageAsync<Utterance[]>('utterances')

    if (cachedUtterances) {
      setUtterances(cachedUtterances)
    }

    setTimeout(() => {
      setIsLoading(false)
      // Simulate server latency
    }, 3000)
  }, [])

  useEffect(() => {
    void getUtterancesFromLocaleStorage()
  }, [getUtterancesFromLocaleStorage])

  useEffect(() => {
    if (!isLoading) {
      // set initial selection
      const nextLowConfidenceWord = getNextLowConfidenceWord({
        selectedUtteranceIndex: -1,
        selectedWordIndex: -1,
        utterances,
      })

      if (nextLowConfidenceWord) {
        setSelected(nextLowConfidenceWord)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- adding utterances will cause unnecessary updates
  }, [isLoading])

  const onSelectWord: OnSelectWord = useCallback(
    ({ utteranceIndex, wordIndex }) => {
      setSelected({ utteranceIndex, wordIndex })
      setAudioTime(utterances[utteranceIndex]?.words[wordIndex].start - 1)
    },
    [setAudioTime, utterances],
  )

  // Proceed to the next word with confidence <= 0.8 in the utterances array, and set audio time to it
  const onProceed = useCallback(() => {
    const nextLowConfidenceWord = getNextLowConfidenceWord({
      selectedUtteranceIndex: selected.utteranceIndex,
      selectedWordIndex: selected.wordIndex,
      utterances,
    })

    if (nextLowConfidenceWord !== null) {
      const { utteranceIndex, wordIndex } = nextLowConfidenceWord
      setSelected({ wordIndex, utteranceIndex })
      setAudioTime(utterances[utteranceIndex]?.words[wordIndex].start - 1)
    }
  }, [utterances, selected, setAudioTime])

  // Replace word and update confidence to 1, update the state, and proceed to the next word with confidence <= 0.8.
  const onSaveWord: OnSaveWord = useCallback(
    async ({ utteranceIndex, wordIndex, newWord }) => {
      const oldPunctuatedWord = utterances[utteranceIndex].words[wordIndex].punctuated_word

      const newUtterances = replaceAtIndex(utterances, utteranceIndex, {
        words: replaceAtIndex(utterances[utteranceIndex].words, wordIndex, {
          confidence: 1,
          word: newWord,
          punctuated_word: updatePunctuatedWord(oldPunctuatedWord, newWord),
        }),
      })
      setUtterances(newUtterances)
      await saveToLocalStorageAsync('utterances', newUtterances)
      onProceed()
    },
    [utterances, onProceed],
  )

  // Calculate the count of words with confidence <= 0.8 in an array of Utterances.
  const lowConfidenceWordsCount = useMemo(
    () => calculateLowConfidenceWordsCount(utterances),
    [utterances],
  )

  const selectedWord = useMemo(
    () => utterances[selected.utteranceIndex]?.words[selected.wordIndex],
    [utterances, selected],
  )

  useEffect(() => {
    if (selectedWordRef.current) {
      // auto scroll to the selected word
      selectedWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: isUp900 ? 'center' : 'start',
      })
    }
  }, [selectedWord, isUp900])

  useEffect(() => {
    // set highlighted utterance index based on the current time
    const audioElement = audioRef.current

    const handleTimeUpdate = () => {
      if (audioElement) {
        // Get the current time from the audio element
        const { currentTime } = audioElement
        const highlightedUtterance = utterances[highlightedUtteranceIndex]

        // Check if the current time is not within the highlighted utterance's time range to avoid unnecessary loops
        const isNotWithinRange =
          currentTime < highlightedUtterance.start || currentTime > highlightedUtterance.end

        if (isNotWithinRange) {
          // Find the index of the utterance that is currently being played
          const currentUtteranceIndex = utterances.findIndex(
            (utterance) => currentTime >= utterance.start && currentTime < utterance.end,
          )

          // Update the highlighted utterance index if a new utterance is being played
          if (currentUtteranceIndex !== -1 && currentUtteranceIndex !== highlightedUtteranceIndex) {
            setHighlightedUtteranceIndex(currentUtteranceIndex)
          }
        }
      }
    }

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate)
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [audioRef, highlightedUtteranceIndex, utterances])

  useEffect(() => {
    if (highlightedUtteranceRef.current) {
      // auto scroll the highlighted utterance into view
      highlightedUtteranceRef.current.scrollIntoView({
        behavior: 'smooth',
        block: isUp900 ? 'center' : 'start',
      })
    }
  }, [highlightedUtteranceIndex, isUp900])

  return {
    onSelectWord,
    onSaveWord,
    onProceed,
    selected,
    selectedWord,
    selectedWordRef,
    utterances,
    isLoading,
    lowConfidenceWordsCount,
    highlightedUtteranceIndex,
    highlightedUtteranceRef,
  }
}
