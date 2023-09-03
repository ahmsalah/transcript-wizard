import type { Utterance } from '@/types/Utterance'

/**
 * Calculates the number of words with confidence less than or equal to 0.8
 * in a list of utterances.
 *
 * @param utterances - List of Utterances
 * @returns The count of low-confidence words.
 */
export const calculateLowConfidenceWordsCount = (utterances: Utterance[]) => {
  let count = 0

  for (const utterance of utterances) {
    for (const word of utterance.words) {
      if (word.confidence <= 0.8) {
        count++
      }
    }
  }

  return count
}
