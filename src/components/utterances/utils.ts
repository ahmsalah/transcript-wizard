import type { FlexProps } from '../box'

//a confidence value between 0.6-0.8 should be highlighted in yellow, and anything lower in red.
export const getConfidenceProps = (confidence: number) => {
  let color = 'text.primary'
  let fontWeight = '500'
  let sx: FlexProps['sx'] = {}

  if (confidence <= 0.8) {
    color = 'warning.main'
    fontWeight = 'bold'
    sx = {
      '&:hover': {
        backgroundColor: 'action.selected',
      },
    }
  }

  if (confidence < 0.6) {
    color = 'error.dark'
  }

  return { color, fontWeight, sx }
}
