import type { Utterance } from '@/types/Utterance'
import { createMapFromList, mergeUtterances } from '@/utils'
import type { UtterancesMap } from '@/types/UtterancesMap'
import { http } from './http'

type GetUtterancesResponse = {
  results: {
    utterances: Utterance[]
  }
}

export async function getUtterances(): Promise<UtterancesMap> {
  const { results } = await http.get<GetUtterancesResponse>(
    'https://file.notion.so/f/f/f993230d-8957-44db-a873-af2f26d2d410/457b4023-0b3c-4465-b837-c4dafc34bdce/sample_transcription.json?id=348ac563-f262-4ccc-8e86-a983987f1eee&table=block&spaceId=f993230d-8957-44db-a873-af2f26d2d410&expirationTimestamp=1693785600000&signature=CTfGdeL7sici_5xH_wxvS8DA-nyUYzRxRtqzkxY7CiM&downloadName=sample_transcription.json',
  )

  const mergedUtterances = mergeUtterances(results.utterances)

  return createMapFromList(mergedUtterances, (utterance) => utterance.id)
}
