import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import { forwardRef, memo } from 'react'

type AudioPlayerProps = BoxProps & {
  src: string
}

export const AudioPlayer = memo(
  forwardRef<HTMLAudioElement, AudioPlayerProps>(({ src, ...props }, ref) => {
    return (
      <Box component='audio' controls ref={ref} width={1} {...props}>
        <source src={src} type='audio/mpeg' />
        <track kind='captions' label='English captions' srcLang='en' />
        Your browser does not support the audio element.
      </Box>
    )
  }),
)

AudioPlayer.displayName = 'AudioPlayer'
