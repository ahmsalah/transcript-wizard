import type { FunctionComponent } from 'react'
import { memo } from 'react'
import { Button, Typography } from '@mui/material'
import type { Utterance } from '@/types/Utterance'
import { formatTime } from '@/utils'
import { Flex } from '../box'
import { getConfidenceProps } from './utils'

export type UtteranceItemProps = Utterance & {
  seekToTime: (timeInSeconds: number) => void
}

export const UtteranceItem: FunctionComponent<UtteranceItemProps> = memo(
  ({ words, start, seekToTime }) => {
    return (
      <Flex gap={2}>
        <Button
          disableTouchRipple
          onClick={() => {
            seekToTime(start)
          }}
          sx={{ alignItems: 'flex-start' }}
        >
          <span>{formatTime(start)}</span>
        </Button>
        <Flex
          borderRadius={1}
          component='p'
          flex={1}
          gap={0.5}
          inline
          maxWidth={500}
          my={0}
          p={1}
          sx={{
            transition: 'background-color 150ms',
            '&:hover': {
              backgroundColor: 'action.hover',
              cursor: 'text',
            },
          }}
          wrap
        >
          {words.map(({ word, confidence }, index) => (
            <Typography component='span' key={index.toString()} {...getConfidenceProps(confidence)}>
              {word}
            </Typography>
          ))}
        </Flex>
      </Flex>
    )
  },
)

UtteranceItem.displayName = 'UtteranceItem'
