import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'
import { forwardRef, memo } from 'react'
import type { FlexProps } from '../box'
import { Flex } from '../box'
import { drawerWidthMd, drawerWidthSm } from '../sidebar'

type AudioPlayerProps = FlexProps & {
  src: string
  audioProps?: BoxProps
}

export const AudioPlayer = memo(
  forwardRef<HTMLAudioElement, AudioPlayerProps>(({ src, audioProps, ...props }, ref) => {
    return (
      <Flex column>
        <Box height={120} />
        <Flex
          alignCenter
          bgcolor='background.paper'
          bottom={0}
          boxShadow="'0px -1px 1px 0px rgba(0, 0, 0, 0.10)'"
          left={{ xs: 0, sm: drawerWidthSm - 1, md: drawerWidthMd - 2 }}
          p={3}
          position='fixed'
          right={0}
          {...props}
        >
          <Box component='audio' controls ref={ref} width={1} {...audioProps}>
            <source src={src} type='audio/mpeg' />
            <track kind='captions' label='English captions' srcLang='en' />
            Your browser does not support the audio element.
          </Box>
        </Flex>
      </Flex>
    )
  }),
)

AudioPlayer.displayName = 'AudioPlayer'
