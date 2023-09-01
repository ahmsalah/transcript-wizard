import type { FunctionComponent } from 'react'
import { memo } from 'react'
import type { Utterance } from '@/types/Utterance'
import { Flex } from '../box'
import { UtteranceItem } from './UtteranceItem'

type UtterancesProps = {
  utterances: Utterance[]
}

export const Utterances: FunctionComponent<UtterancesProps> = memo(({ utterances }) => {
  return (
    <Flex column gap={2}>
      {utterances.map((utterance) => (
        <UtteranceItem key={utterance.id} {...utterance} />
      ))}
    </Flex>
  )
})

Utterances.displayName = 'Utterances'
