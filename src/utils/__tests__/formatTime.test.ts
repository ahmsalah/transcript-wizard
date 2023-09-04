import { formatTime } from '../formatTime'

describe('formatTime', () => {
  it('should format a duration in seconds as "hh:mm:ss"', () => {
    const seconds = 90
    const formattedTime = formatTime(seconds)
    expect(formattedTime).toBe('00:01:30')
  })

  it('should format zero seconds as "00:00:00"', () => {
    const seconds = 0
    const formattedTime = formatTime(seconds)
    expect(formattedTime).toBe('00:00:00')
  })

  it('should format a duration in hours as "hh:mm:ss"', () => {
    const seconds = 7200 // 2 hours
    const formattedTime = formatTime(seconds)
    expect(formattedTime).toBe('02:00:00')
  })

  it('should format a duration with leading zeros', () => {
    const seconds = 3723 // 1 hour, 2 minutes, 3 seconds
    const formattedTime = formatTime(seconds)
    expect(formattedTime).toBe('01:02:03')
  })
})
