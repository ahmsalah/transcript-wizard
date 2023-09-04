import { calculateAverage } from '../calculateAverage'

describe('calculateAverage', () => {
  it('calculates the average of two numbers', () => {
    const num1 = 4
    const num2 = 6

    const result = calculateAverage(num1, num2)

    expect(result).toBe(5)
  })
})
