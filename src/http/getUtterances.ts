import type { Utterance } from '@/types/Utterance'
import { mergeUtterances } from '@/utils'
import { http } from './http'

type GetUtterancesResponse = {
  results: {
    utterances: Utterance[]
  }
}

export async function getUtterances(): Promise<Utterance[]> {
  const { results } = await http.get<GetUtterancesResponse>(
    'https://file.notion.so/f/f/f993230d-8957-44db-a873-af2f26d2d410/7c6a54bf-0fb4-4227-bbb5-2ac73109891d/sample_transcription.json?id=98ba3547-1ce6-461c-993b-a595bd51b59d&table=block&spaceId=f993230d-8957-44db-a873-af2f26d2d410&expirationTimestamp=1693879200000&signature=nRqqmaLIT5Hian_rjvhqJ9UY-KNDnr1NZBSFLXY6QfM&downloadName=sample_transcription.json',
  )

  return mergeUtterances(results.utterances)
}
