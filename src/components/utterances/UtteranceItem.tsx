import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { Button, Typography } from '@mui/material'
import type { Utterance } from '@/types/Utterance'
import { formatTime } from '@/utils'
import { Flex } from '../box'

export const UtteranceItem: FunctionComponent<Utterance> = memo(({ words, start }) => {
  return (
    <Flex alignItems='flex-start' gap={2}>
      <Button>{formatTime(start)}</Button>
      <Flex component='p' gap={0.5} inline maxWidth={500} my={0} pt={0.75} wrap>
        {words.map(({ word }, index) => (
          <Typography component='span' key={index.toString()}>
            {word}
          </Typography>
        ))}
      </Flex>
    </Flex>
  )
})

UtteranceItem.displayName = 'UtteranceItem'
