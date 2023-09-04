import { createMapFromList } from '../createMapFromList'

describe('createMapFromList', () => {
  it('should create a Map from an array of items with key selector', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
    ]

    const result = createMapFromList(items, (item) => item.id)

    expect(result).toBeInstanceOf(Map)
    expect(result.size).toBe(3)
    expect(result.get('1')).toEqual({ id: '1', name: 'Item 1' })
    expect(result.get('2')).toEqual({ id: '2', name: 'Item 2' })
    expect(result.get('3')).toEqual({ id: '3', name: 'Item 3' })
  })

  it('should handle duplicate keys by overwriting', () => {
    const items = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '1', name: 'Item 1 - Updated' },
    ]

    const result = createMapFromList(items, (item) => item.id)

    expect(result).toBeInstanceOf(Map)
    expect(result.size).toBe(2)
    expect(result.get('1')).toEqual({ id: '1', name: 'Item 1 - Updated' })
    expect(result.get('2')).toEqual({ id: '2', name: 'Item 2' })
  })
})
