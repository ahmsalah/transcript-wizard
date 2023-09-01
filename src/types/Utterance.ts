import type { Word } from './Word'

export type Utterance = {
  start: number
  end: number
  confidence: number
  channel: number
  transcript: string
  words: Word[]
  speaker: number
  id: string
}
