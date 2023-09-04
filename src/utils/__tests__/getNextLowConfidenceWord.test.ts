import type { Utterance } from '@/types/Utterance'
import { getNextLowConfidenceWord } from '../getNextLowConfidenceWord'
import { createWord } from '../test.utils'

describe('getNextLowConfidenceWord', () => {
  it('should return null when no word with confidence <= 0.8 is found', () => {
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

    const result = getNextLowConfidenceWord({
      utterances,
      selectedUtteranceIndex: 0,
      selectedWordIndex: 0,
    })

    expect(result).toBeNull()
  })

  it('should return the next low confidence word after the selected word', () => {
    const utterances: Utterance[] = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Hello',
        words: [createWord(0.9), createWord(0.6)],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.9,
        channel: 1,
        transcript: 'World',
        words: [createWord(0.7), createWord(0.9)],
        speaker: 1,
        id: '2',
      },
    ]

    const result = getNextLowConfidenceWord({
      utterances,
      selectedUtteranceIndex: 0,
      selectedWordIndex: 0,
    })

    expect(result).toEqual({ wordIndex: 1, utteranceIndex: 0 })
  })

  it('should return the next low confidence word in the next utterance', () => {
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
        words: [createWord(0.7), createWord(0.9)],
        speaker: 1,
        id: '2',
      },
    ]

    const result = getNextLowConfidenceWord({
      utterances,
      selectedUtteranceIndex: 0,
      selectedWordIndex: 1,
    })

    expect(result).toEqual({ wordIndex: 0, utteranceIndex: 1 })
  })

  it('should return null if no low confidence word is found after the selected word', () => {
    const utterances: Utterance[] = [
      {
        start: 0,
        end: 1,
        confidence: 0.6,
        channel: 1,
        transcript: 'Hello',
        words: [createWord(0.6)],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.9,
        channel: 1,
        transcript: 'World',
        words: [createWord(0.9)],
        speaker: 1,
        id: '2',
      },
    ]

    const result = getNextLowConfidenceWord({
      utterances,
      selectedUtteranceIndex: 0,
      selectedWordIndex: 0,
    })

    expect(result).toBeNull()
  })
})
