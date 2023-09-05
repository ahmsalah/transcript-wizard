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
    'https://file.notion.so/f/f/f993230d-8957-44db-a873-af2f26d2d410/082e3195-a004-453f-8b35-2ade9fcc7ff5/sample_transcription.json?id=4a369ace-a984-4d3c-b59f-f38d15aac4f8&table=block&spaceId=f993230d-8957-44db-a873-af2f26d2d410&expirationTimestamp=1694044800000&signature=7Kt8VLN36FmuCilOJGb4mmnqp5ZCmpWUjiSiLNehOH8&downloadName=sample_transcription.json',
  )

  return mergeUtterances(results.utterances)
}
