'use client'
import { useCallback, useRef, useState } from 'react'
import type { Utterance } from '@/types/Utterance'

type OnSelectWordParams = {
  utteranceIndex: number
  wordIndex: number
}
export type OnSelectWord = (params: OnSelectWordParams) => void

type OnSubmitWordParams = OnSelectWordParams & {
  newWord: string
}
export type OnSubmitWord = (params: OnSubmitWordParams) => void

type UseTranscriptUtterancesParams = {
  utterances: Utterance[]
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

  const onSelectWord: OnSelectWord = useCallback(({ utteranceIndex, wordIndex }) => {
    setSelected({ utteranceIndex, wordIndex })
  }, [])

  const onProceed = useCallback(() => {
    let shouldBreak = false
    let utteranceIndex = 0

    for (const utterance of utterances) {
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

  const onSubmitWord: OnSubmitWord = useCallback(({ utteranceIndex, wordIndex, newWord }) => {
    console.log('onSubmitWord', utteranceIndex, wordIndex, newWord)

    // if (
    //   utteranceIndex === currentUtteranceIndex &&
    //   wordIndex === currentWordIndex
    // ) {
    //   if (currentWord === newWord) {
    //     onProceed()
    //   } else {
    //     console.log('try again!')
    //   }
    // }
  }, [])

  return {
    onSelectWord,
    onSubmitWord,
    onProceed,
    selected,
    selectedWordRef,
  }
}
