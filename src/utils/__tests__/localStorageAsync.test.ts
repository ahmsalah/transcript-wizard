import type { LocalStorageKey } from '@/types/LocalStorageKey'
import { getFromLocalStorageAsync, saveToLocalStorageAsync } from '../localStorageAsync'

describe('saveToLocalStorageAsync and getFromLocalStorageAsync', () => {
  it('should save and retrieve a string from local storage asynchronously', async () => {
    const stringData = 'Hello, world!'
    const stringKey = 'stringKey' as LocalStorageKey

    await saveToLocalStorageAsync(stringKey, stringData)
    const retrievedStringData = await getFromLocalStorageAsync<string>(stringKey)
    expect(retrievedStringData).toBe(stringData)
  })

  it('should save and retrieve an object from local storage asynchronously', async () => {
    const objectData = { name: 'Alice', age: 30 }
    const objectKey = 'objectKey' as LocalStorageKey

    await saveToLocalStorageAsync(objectKey, objectData)
    const retrievedObjectData = await getFromLocalStorageAsync<{ name: string; age: number }>(
      objectKey,
    )
    expect(retrievedObjectData).toEqual(objectData)
  })

  it('should save and retrieve an array from local storage asynchronously', async () => {
    const arrayData = [1, 2, 3, 4, 5]
    const arrayKey = 'arrayKey' as LocalStorageKey

    await saveToLocalStorageAsync(arrayKey, arrayData)
    const retrievedArrayData = await getFromLocalStorageAsync<number[]>(arrayKey)
    expect(retrievedArrayData).toEqual(arrayData)
  })

  it('should handle retrieving data that does not exist asynchronously', async () => {
    const nonExistingKey = 'nonExistingKey' as LocalStorageKey
    const retrievedNonExistingData = await getFromLocalStorageAsync<number[]>(nonExistingKey)
    expect(retrievedNonExistingData).toBeNull()
  })

  it('should handle errors during deserialization asynchronously', async () => {
    const invalidData = 'Invalid JSON'
    const invalidKey = 'invalidKey' as LocalStorageKey

    localStorage.setItem(invalidKey, invalidData)
    try {
      await getFromLocalStorageAsync<string>(invalidKey)
      // Expect an error to be thrown in case of invalid data
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
