import { Transcript } from '@/components'
import { getUtterances } from '@/http'

export default async function HomePage() {
  const utterances = await getUtterances()

  return (
    <main>
      <Transcript utterances={utterances} />
    </main>
  )
}
