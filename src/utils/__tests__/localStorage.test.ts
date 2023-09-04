import type { LocalStorageKey } from '@/types/LocalStorageKey'
import { getFromLocalStorage, saveToLocalStorage } from '../localStorage'

describe('saveToLocalStorage and getFromLocalStorage', () => {
  it('should save and retrieve a string from local storage', () => {
    const stringData = 'Hello, world!'
    const stringKey = 'stringKey' as LocalStorageKey

    saveToLocalStorage(stringKey, stringData)
    const retrievedStringData = getFromLocalStorage<string>(stringKey)
    expect(retrievedStringData).toBe(stringData)
  })

  it('should save and retrieve an object from local storage', () => {
    const objectData = { name: 'Alice', age: 30 }
    const objectKey = 'objectKey' as LocalStorageKey

    saveToLocalStorage(objectKey, objectData)
    const retrievedObjectData = getFromLocalStorage<{ name: string; age: number }>(objectKey)
    expect(retrievedObjectData).toEqual(objectData)
  })

  it('should save and retrieve an array from local storage', () => {
    const arrayData = [1, 2, 3, 4, 5]
    const arrayKey = 'arrayKey' as LocalStorageKey

    saveToLocalStorage(arrayKey, arrayData)
    const retrievedArrayData = getFromLocalStorage<number[]>(arrayKey)
    expect(retrievedArrayData).toEqual(arrayData)
  })

  it('should handle retrieving data that does not exist', () => {
    const nonExistingKey = 'nonExistingKey' as LocalStorageKey
    const retrievedNonExistingData = getFromLocalStorage<number[]>(nonExistingKey)
    expect(retrievedNonExistingData).toBeNull()
  })

  it('should handle errors during deserialization', () => {
    const invalidData = 'Invalid JSON'
    const invalidKey = 'invalidKey' as LocalStorageKey

    localStorage.setItem(invalidKey, invalidData)
    const retrievedInvalidData = getFromLocalStorage<string>(invalidKey)
    expect(retrievedInvalidData).toBeNull()
  })
})
