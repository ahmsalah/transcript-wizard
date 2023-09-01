import { Utterances } from '@/components'
import { getUtterances } from '@/http'

export default async function HomePage() {
  const { results } = await getUtterances()

  return (
    <main>
      <Utterances utterances={results.utterances} />
    </main>
  )
}
