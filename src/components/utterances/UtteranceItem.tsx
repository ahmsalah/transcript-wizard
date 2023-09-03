'use client'
import { forwardRef, memo } from 'react'
import { Typography } from '@mui/material'
import type { Utterance } from '@/types/Utterance'
import { formatTime } from '@/utils'
import { Flex, FlexButton } from '../box'
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
        <FlexButton
          borderRadius={1}
          disableTouchRipple
          gap={2}
          maxWidth={680}
          onClick={() => {
            onPlayAtTime(start)
          }}
          sx={{
            transition: 'background-color 150ms',
            '&:hover, &:focus': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          <Typography fontWeight='bold' p={1.5}>
            <span>{formatTime(start)}</span>
          </Typography>
          <Flex component='p' flex={1} inline my={0} p={1} wrap>
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
                  onClick={(event) => {
                    if (confidence <= 0.8) {
                      event.stopPropagation()
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
        </FlexButton>
      )
    },
  ),
)

UtteranceItem.displayName = 'UtteranceItem'
