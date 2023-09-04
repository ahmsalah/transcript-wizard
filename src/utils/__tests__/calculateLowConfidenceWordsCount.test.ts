import type { Utterance } from '@/types/Utterance'
import { calculateLowConfidenceWordsCount } from '../calculateLowConfidenceWordsCount'
import { createWord } from '../test.utils'

describe('calculateLowConfidenceWordsCount', () => {
  it('should return 0 when there are no low confidence words', () => {
    const utterances: Utterance[] = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Hello',
        words: [createWord(0.9), createWord(0.9)],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.9,
        channel: 1,
        transcript: 'World',
        words: [createWord(0.9), createWord(0.9)],
        speaker: 1,
        id: '2',
      },
    ]

    const count = calculateLowConfidenceWordsCount(utterances)

    expect(count).toBe(0)
  })

  it('should return the correct count of low confidence words', () => {
    const utterances: Utterance[] = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Hello',
        words: [createWord(0.6), createWord(0.9)],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.9,
        channel: 1,
        transcript: 'World',
        words: [createWord(0.8), createWord(0.5)],
        speaker: 1,
        id: '2',
      },
    ]

    const count = calculateLowConfidenceWordsCount(utterances)

    expect(count).toBe(3)
  })

  it('should handle cases where confidence is exactly 0.8', () => {
    const utterances: Utterance[] = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Hello',
        words: [createWord(0.8), createWord(0.8)],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.9,
        channel: 1,
        transcript: 'World',
        words: [createWord(0.9), createWord(0.9)],
        speaker: 1,
        id: '2',
      },
    ]

    const count = calculateLowConfidenceWordsCount(utterances)

    expect(count).toBe(2)
  })
})
