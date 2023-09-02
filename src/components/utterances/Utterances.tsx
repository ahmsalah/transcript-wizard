import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { getUtterances } from '@/http'
import { Flex } from '../box'
import type { UtteranceItemProps } from './UtteranceItem'
import { UtteranceItem } from './UtteranceItem'

type UtterancesProps = Pick<UtteranceItemProps, 'seekToTime'>

export const Utterances: FunctionComponent<UtterancesProps> = memo(async ({ seekToTime }) => {
  const utterances = await getUtterances()

  return (
    <Flex column gap={2}>
      {utterances.map((utterance) => (
        <UtteranceItem key={utterance.id} {...utterance} seekToTime={seekToTime} />
      ))}
    </Flex>
  )
})

Utterances.displayName = 'Utterances'
