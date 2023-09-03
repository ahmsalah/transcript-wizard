import type { FlexProps } from '../box'

//a confidence value between 0.6-0.8 should be highlighted in yellow, and anything lower in red.
export const getConfidenceProps = (confidence: number, isSelected: boolean) => {
  let bgcolor = 'transparent'
  let color = 'text.primary'
  let fontWeight = '500'
  let sx: FlexProps['sx'] = {
    transition: 'background-color 150ms',
  }

  if (confidence <= 0.8) {
    color = 'warning.main'
    fontWeight = 'bold'
    if (!isSelected) {
      sx = {
        ...sx,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.selected',
        },
      }
    }
  }

  if (confidence < 0.6) {
    color = 'error.dark'
  }

  if (isSelected) {
    bgcolor = color
    color = 'common.white'
  }

  return { bgcolor, color, fontWeight, sx }
}
