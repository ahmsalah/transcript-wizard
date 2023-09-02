'use client'
import { forwardRef, memo } from 'react'
import { Button, Typography } from '@mui/material'
import type { Utterance } from '@/types/Utterance'
import { formatTime } from '@/utils'
import { Flex } from '../box'
import { getConfidenceProps } from './utils'

type UtteranceItemProps = Utterance & {
  onPlayAtTime: (timeInSeconds: number) => void
  utteranceIndex: number
  selectedUtteranceIndex: number
  selectedWordIndex: number
  onSelectWord: (utteranceIndex: number, wordIndex: number) => void
}

export const UtteranceItem = memo(
  forwardRef<HTMLDivElement, UtteranceItemProps>(
    (
      {
        words,
        start,
        onPlayAtTime,
        utteranceIndex,
        selectedUtteranceIndex,
        selectedWordIndex,
        onSelectWord,
      },
      ref,
    ) => {
      return (
        <Flex gap={2}>
          <Button
            disableTouchRipple
            onClick={() => {
              onPlayAtTime(start)
            }}
            sx={{ alignItems: 'flex-start' }}
          >
            <span>{formatTime(start)}</span>
          </Button>
          <Flex
            borderRadius={1}
            component='p'
            flex={1}
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
            {words.map(({ punctuated_word: word, confidence }, index) => {
              const isSelected =
                selectedWordIndex === index && selectedUtteranceIndex === utteranceIndex
              return (
                <Typography
                  borderRadius={1}
                  component='span'
                  key={index.toString()}
                  p={0.25}
                  {...getConfidenceProps(confidence, isSelected)}
                  onClick={() => {
                    if (confidence <= 0.8) {
                      onSelectWord(utteranceIndex, index)
                    }
                  }}
                  ref={isSelected ? ref : undefined}
                >
                  {word}
                </Typography>
              )
            })}
          </Flex>
        </Flex>
      )
    },
  ),
)

UtteranceItem.displayName = 'UtteranceItem'
