'use client'
import { useCallback, useRef, useState } from 'react'
import type { UtterancesMap } from '@/types/UtterancesMap'

type UseTranscriptUtterancesParams = {
  utterances: UtterancesMap
}

export const useTranscriptUtterances = ({ utterances }: UseTranscriptUtterancesParams) => {
  const selectedWordRef = useRef<HTMLDivElement | null>(null)
  const [selected, setSelected] = useState<{
    utteranceIndex: number
    wordIndex: number
  }>({
    utteranceIndex: 0,
    wordIndex: 0,
  })

  const onSelectWord = useCallback((utteranceIndex: number, wordIndex: number) => {
    setSelected({ utteranceIndex, wordIndex })
  }, [])

  const onProceed = useCallback(() => {
    let shouldBreak = false
    let utteranceIndex = 0

    for (const [_, utterance] of utterances) {
      if (shouldBreak) break // Break if the condition was met in a previous utterance
      let wordIndex = 0
      for (const word of utterance.words) {
        if (word.confidence <= 0.8) {
          const isNextWord =
            (utteranceIndex === selected.utteranceIndex && wordIndex > selected.wordIndex) ||
            utteranceIndex > selected.utteranceIndex

          if (isNextWord) {
            setSelected({ wordIndex, utteranceIndex })

            shouldBreak = true // Set the flag to break the outer loop
            break // Break the inner loop
          }
        }
        wordIndex++
      }
      utteranceIndex++
    }
    if (selectedWordRef.current) {
      selectedWordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [utterances, selected])

  return {
    onSelectWord,
    onProceed,
    selected,
    selectedWordRef,
  }
}
