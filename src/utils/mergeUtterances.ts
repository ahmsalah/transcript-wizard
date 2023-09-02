import type { Utterance } from '@/types/Utterance'
import { calculateAverage } from './calculateAverage'

/**
 * Merges subsequent utterances of the same speaker into one big utterance.
 *
 * @param utterances - An array of Utterance objects representing individual utterances.
 * @returns An array of Utterance objects where subsequent utterances from the same speaker are merged.
 */
export const mergeUtterances = (utterances: Utterance[]): Utterance[] => {
  const mergedUtterances: Utterance[] = []
  let currentUtterance: Utterance | null = null

  for (const utterance of utterances) {
    if (!currentUtterance) {
      // If no currentUtterance exists, start a new one
      currentUtterance = { ...utterance }
    } else if (currentUtterance.speaker === utterance.speaker) {
      // If the speaker is the same, extend the current utterance
      currentUtterance = extendUtterance(currentUtterance, utterance)
    } else {
      // If the speaker is different, push the currentUtterance and start a new one
      mergedUtterances.push(currentUtterance)
      currentUtterance = { ...utterance }
    }
  }

  // Push the last merged utterance if it exists
  if (currentUtterance) {
    mergedUtterances.push(currentUtterance)
  }

  return mergedUtterances
}

const extendUtterance = (currentUtterance: Utterance, newUtterance: Utterance): Utterance => {
  return {
    ...currentUtterance,
    end: newUtterance.end,
    transcript: `${currentUtterance.transcript} ${newUtterance.transcript}`,
    words: [...currentUtterance.words, ...newUtterance.words],
    confidence: calculateAverage(currentUtterance.confidence, newUtterance.confidence),
  }
}
