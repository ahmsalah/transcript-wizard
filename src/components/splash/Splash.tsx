'use client'
import { memo, forwardRef } from 'react'
import Lottie from 'lottie-react'
import { Box } from '@mui/material'
import lottieLogo from '@/assets/lotties/audio-waves.json'
import type { FlexProps } from '../box'
import { Flex } from '../box'

type SplashProps = FlexProps & {
  onComplete?: () => void
}

export const Splash = memo(
  forwardRef<HTMLDivElement, SplashProps>(({ onComplete, ...props }, ref) => {
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
            animationData={lottieLogo}
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
