import type { Utterance } from '@/types/Utterance'
import { mergeUtterances } from '../mergeUtterances'

describe('mergeUtterances', () => {
  it('should merge subsequent utterances from the same speaker', () => {
    const utterances: Utterance[] = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Hello,',
        words: [
          {
            word: 'Hello,',
            start: 0,
            end: 1,
            confidence: 0.9,
            speaker: 1,
            speaker_confidence: 0.9,
            punctuated_word: 'Hello,',
          },
        ],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.85,
        channel: 1,
        transcript: 'world!',
        words: [
          {
            word: 'world!',
            start: 1,
            end: 2,
            confidence: 0.85,
            speaker: 1,
            speaker_confidence: 0.85,
            punctuated_word: 'world!',
          },
        ],
        speaker: 1,
        id: '2',
      },
    ]

    const mergedUtterances = mergeUtterances(utterances)

    expect(mergedUtterances).toHaveLength(1)
    expect(mergedUtterances[0].start).toBe(0)
    expect(mergedUtterances[0].end).toBe(2)
    expect(mergedUtterances[0].confidence).toBeCloseTo(0.875, 5)
    expect(mergedUtterances[0].transcript).toBe('Hello, world!')
    expect(mergedUtterances[0].words).toHaveLength(2)
  })

  it('should not merge utterances from different speakers', () => {
    const utterances = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Speaker 1: Hello,',
        words: [
          {
            word: 'Speaker',
            start: 0,
            end: 1,
            confidence: 0.9,
            speaker: 1,
            speaker_confidence: 0.9,
            punctuated_word: 'Speaker',
          },
          {
            word: '1:',
            start: 0,
            end: 1,
            confidence: 0.9,
            speaker: 1,
            speaker_confidence: 0.9,
            punctuated_word: '1:',
          },
          {
            word: 'Hello,',
            start: 0,
            end: 1,
            confidence: 0.9,
            speaker: 1,
            speaker_confidence: 0.9,
            punctuated_word: 'Hello,',
          },
        ],
        speaker: 1,
        id: '1',
      },
      {
        start: 1,
        end: 2,
        confidence: 0.85,
        channel: 1,
        transcript: 'Speaker 2: world!',
        words: [
          {
            word: 'Speaker',
            start: 1,
            end: 2,
            confidence: 0.85,
            speaker: 2,
            speaker_confidence: 0.85,
            punctuated_word: 'Speaker',
          },
          {
            word: '2:',
            start: 1,
            end: 2,
            confidence: 0.85,
            speaker: 2,
            speaker_confidence: 0.85,
            punctuated_word: '2:',
          },
          {
            word: 'world!',
            start: 1,
            end: 2,
            confidence: 0.85,
            speaker: 2,
            speaker_confidence: 0.85,
            punctuated_word: 'world!',
          },
        ],
        speaker: 2,
        id: '2',
      },
    ]

    const mergedUtterances = mergeUtterances(utterances)

    expect(mergedUtterances).toHaveLength(2)
    expect(mergedUtterances[0].start).toBe(0)
    expect(mergedUtterances[0].end).toBe(1)
    expect(mergedUtterances[1].start).toBe(1)
    expect(mergedUtterances[1].end).toBe(2)
  })

  it('should handle empty input', () => {
    const utterances: Utterance[] = []

    const mergedUtterances = mergeUtterances(utterances)

    expect(mergedUtterances).toHaveLength(0)
  })

  it('should handle input with a single utterance', () => {
    const utterances = [
      {
        start: 0,
        end: 1,
        confidence: 0.9,
        channel: 1,
        transcript: 'Hello,',
        words: [
          {
            word: 'Hello,',
            start: 0,
            end: 1,
            confidence: 0.9,
            speaker: 1,
            speaker_confidence: 0.9,
            punctuated_word: 'Hello,',
          },
        ],
        speaker: 1,
        id: '1',
      },
    ]

    const mergedUtterances = mergeUtterances(utterances)

    expect(mergedUtterances).toHaveLength(1)
    expect(mergedUtterances[0].start).toBe(0)
    expect(mergedUtterances[0].end).toBe(1)
  })
})
