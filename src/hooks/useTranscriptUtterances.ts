'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Utterance } from '@/types/Utterance'
import {
  replaceAtIndex,
  updatePunctuatedWord,
  getFromLocalStorageAsync,
  saveToLocalStorageAsync,
} from '@/utils'

type OnSelectWordParams = {
  utteranceIndex: number
  wordIndex: number
}
export type OnSelectWord = (params: OnSelectWordParams) => void

type OnSubmitWordParams = OnSelectWordParams & {
  newWord: string
}
export type OnSaveWord = (params: OnSubmitWordParams) => void

type UseTranscriptUtterancesParams = {
  utterancesBase: Utterance[]
}

export const useTranscriptUtterances = ({ utterancesBase }: UseTranscriptUtterancesParams) => {
  const selectedWordRef = useRef<HTMLDivElement | null>(null)
  const [utterances, setUtterances] = useState(utterancesBase)
  const [isLoading, setIsLoading] = useState(true)
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
    setIsLoading(false)
  }, [])

  useEffect(() => {
    void getUtterancesFromLocaleStorage()
  }, [getUtterancesFromLocaleStorage])

  const onSelectWord: OnSelectWord = useCallback(({ utteranceIndex, wordIndex }) => {
    setSelected({ utteranceIndex, wordIndex })
  }, [])

  // Proceed to the next word with confidence <= 0.8 in the utterances array, and scroll it into view.
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

  // Replace word and update confidence to 1, update the state, and proceed to the next word with confidence <= 0.8.
  const onSaveWord: OnSaveWord = useCallback(
    async ({ utteranceIndex, wordIndex, newWord }) => {
      const newUtterances = replaceAtIndex(utterances, utteranceIndex, {
        words: replaceAtIndex(utterances[utteranceIndex].words, wordIndex, {
          confidence: 1,
          word: newWord,
          punctuated_word: updatePunctuatedWord(
            utterances[utteranceIndex].words[wordIndex].punctuated_word,
            newWord,
          ),
        }),
      })
      setUtterances(newUtterances)
      await saveToLocalStorageAsync('utterances', newUtterances)
      onProceed()
    },
    [utterances, onProceed],
  )

  // Calculate the count of words with confidence <= 0.8 in an array of Utterances.
  const lowConfidenceWordsCount = useMemo(() => {
    let count = 0

    for (const utterance of utterances) {
      for (const word of utterance.words) {
        if (word.confidence <= 0.8) {
          count++
        }
      }
    }

    return count
  }, [utterances])

  return {
    onSelectWord,
    onSaveWord,
    onProceed,
    selected,
    selectedWordRef,
    utterances,
    isLoading,
    lowConfidenceWordsCount,
  }
}
