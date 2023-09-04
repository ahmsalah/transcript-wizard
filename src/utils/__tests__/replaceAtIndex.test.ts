import { replaceAtIndex } from '../replaceAtIndex'

type Item = {
  id: number
  value: string
}

describe('replaceAtIndex', () => {
  it('should replace a value at a specific index in an array (Immutable)', () => {
    const originalArray: Item[] = [
      { id: 1, value: 'A' },
      { id: 2, value: 'B' },
      { id: 3, value: 'C' },
    ]
    const indexToReplace = 1
    const newValue: Partial<Item> = { id: 2, value: 'X' }
    const newArray = replaceAtIndex(originalArray, indexToReplace, newValue)
    expect(newArray).not.toBe(originalArray)
    expect(newArray[indexToReplace]).toEqual(newValue)
    expect(newArray[0]).toEqual(originalArray[0])
    expect(newArray[2]).toEqual(originalArray[2])
  })

  it('should handle replacing at the beginning of the array', () => {
    const originalArray: Item[] = [
      { id: 1, value: 'A' },
      { id: 2, value: 'B' },
      { id: 3, value: 'C' },
    ]
    const indexToReplace = 0
    const newValue: Partial<Item> = { id: 1, value: 'X' }
    const newArray = replaceAtIndex(originalArray, indexToReplace, newValue)
    expect(newArray).not.toBe(originalArray)
    expect(newArray[indexToReplace]).toEqual(newValue)
    expect(newArray[1]).toEqual(originalArray[1])
    expect(newArray[2]).toEqual(originalArray[2])
  })

  it('should handle replacing at the end of the array', () => {
    const originalArray: Item[] = [
      { id: 1, value: 'A' },
      { id: 2, value: 'B' },
      { id: 3, value: 'C' },
    ]
    const indexToReplace = 2
    const newValue: Partial<Item> = { id: 3, value: 'X' }
    const newArray = replaceAtIndex(originalArray, indexToReplace, newValue)
    expect(newArray).not.toBe(originalArray)
    expect(newArray[indexToReplace]).toEqual(newValue)
    expect(newArray[0]).toEqual(originalArray[0])
    expect(newArray[1]).toEqual(originalArray[1])
  })

  it('should handle an empty array', () => {
    const originalArray: Item[] = []
    const indexToReplace = 0
    const newValue: Partial<Item> = { id: 1, value: 'X' }
    const newArray = replaceAtIndex(originalArray, indexToReplace, newValue)
    expect(newArray).not.toBe(originalArray)
    expect(newArray).toEqual([])
  })
})
