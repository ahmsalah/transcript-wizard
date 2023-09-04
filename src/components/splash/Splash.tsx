'use client'
import { memo, forwardRef } from 'react'
import Lottie from 'lottie-react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import audioWavesWhite from '@/assets/lotties/audio-waves-white.json'
import audioWavesBlack from '@/assets/lotties/audio-waves-black.json'
import type { FlexProps } from '../box'
import { Flex } from '../box'

type SplashProps = FlexProps & {
  onComplete?: () => void
}

export const Splash = memo(
  forwardRef<HTMLDivElement, SplashProps>(({ onComplete, ...props }, ref) => {
    const theme = useTheme()

    return (
      <Flex
        alignCenter
        bottom={100}
        justifyCenter
        left={{ xs: 0, md: 65, lg: 220 }}
        position='fixed'
        right={0}
        top={0}
        {...props}
        ref={ref}
      >
        <Box sx={{ width: 160 }}>
          <Lottie
            animationData={theme.palette.mode === 'light' ? audioWavesBlack : audioWavesWhite}
            autoplay
            loop
            onComplete={onComplete}
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice',
            }}
          />
        </Box>
      </Flex>
    )
  }),
)

Splash.displayName = 'Splash'
