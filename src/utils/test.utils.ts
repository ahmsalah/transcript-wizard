import type { Word } from '@/types/Word'

// Helper function to create a Word object with the given confidence
export const createWord = (confidence: number): Word => ({
  word: 'test',
  start: 0,
  end: 1,
  confidence,
  speaker: 1,
  speaker_confidence: 0.9,
  punctuated_word: 'test',
})
