import type { Utterance } from '@/types/Utterance'
import { mergeUtterances } from '@/utils'
import { http } from './http'

type GetUtterancesResponse = {
  results: {
    utterances: Utterance[]
  }
}

export async function getUtterances() {
  const { results } = await http.get<GetUtterancesResponse>(
    'https://file.notion.so/f/s/1d087574-c3ce-4f62-ad10-058bfc850a51/sample_transcription.json?id=e5c5289a-686b-41b3-ae91-7bf44bc05be6&table=block&spaceId=eaa13f31-e3d9-4500-b1f3-e0f5583b4dad&expirationTimestamp=1693692000000&signature=0yqFwaCnWvktVwTr8zK4AV26uOZEe3tK5gzQ7EVgHpY&downloadName=sample_transcription.json',
  )

  return mergeUtterances(results.utterances)
}
