import type { PaperProps } from '@mui/material'
import { Paper } from '@mui/material'
import { forwardRef, memo } from 'react'
import Draggable from 'react-draggable'

export const DraggablePaper = memo(
  forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
    return (
      <Draggable cancel={'[class*="no-drag"]'} handle='#draggable-handle'>
        <Paper ref={ref} {...props} />
      </Draggable>
    )
  }),
)

DraggablePaper.displayName = 'DraggablePaper'
