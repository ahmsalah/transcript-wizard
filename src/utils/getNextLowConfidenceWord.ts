import type { Utterance } from '@/types/Utterance'

type GetNextLowConfidenceWordParams = {
  utterances: Utterance[]
  selectedWordIndex: number
  selectedUtteranceIndex: number
}
type GetNextLowConfidenceWord = (
  params: GetNextLowConfidenceWordParams,
) => { wordIndex: number; utteranceIndex: number } | null

/**
 * Searches for the next word with confidence less than or equal to 0.8 in a list
 * of utterances, starting from the selected utterance and word indices.
 *
 * @param utterances - List of utterances.
 * @param selectedUtteranceIndex - Index of the selected utterance.
 * @param selectedWordIndex - Index of the selected word.
 * @returns An object with 'wordIndex' and 'utteranceIndex' or null if no matching word is found.
 */
export const getNextLowConfidenceWord: GetNextLowConfidenceWord = ({
  utterances,
  selectedUtteranceIndex,
  selectedWordIndex,
}) => {
  let utteranceIndex = 0
  for (const utterance of utterances) {
    let wordIndex = 0
    for (const word of utterance.words) {
      if (word.confidence <= 0.8) {
        const isNextWord =
          (utteranceIndex === selectedUtteranceIndex && wordIndex > selectedWordIndex) ||
          utteranceIndex > selectedUtteranceIndex

        if (isNextWord) {
          return { wordIndex, utteranceIndex }
        }
      }
      wordIndex++
    }
    utteranceIndex++
  }
  return null
}
