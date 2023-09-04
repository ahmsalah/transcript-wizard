import type { LocalStorageKey } from '@/types/LocalStorageKey'

/**
 * Save data to local storage asynchronously.
 *
 * @param key - The union type representing the key under which the data will be saved.
 * @param data - The data to save to local storage.
 * @returns A promise that resolves when the data is successfully saved.
 */
export function saveToLocalStorageAsync<T>(key: LocalStorageKey, data: T): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
      resolve()
    } catch (error) {
      // Handle errors, e.g., local storage is full or data cannot be serialized
      if (process.env.NODE_ENV !== 'test') {
        console.error('Error saving to local storage:', error)
      }
      reject(error)
    }
  })
}

/**
 * Retrieve data from local storage asynchronously.
 *
 * @param key - The union type representing the key under which the data is saved in local storage.
 * @returns A promise that resolves with the retrieved data or `null` if the key is not found.
 */
export function getFromLocalStorageAsync<T>(key: LocalStorageKey): Promise<T | null> {
  return new Promise<T | null>((resolve, reject) => {
    try {
      const serializedData = localStorage.getItem(key)
      if (serializedData !== null) {
        const parsedData = JSON.parse(serializedData) as T
        resolve(parsedData)
      } else {
        resolve(null) // Key not found
      }
    } catch (error) {
      // Handle errors, e.g., data cannot be deserialized
      if (process.env.NODE_ENV !== 'test') {
        console.error('Error retrieving from local storage:', error)
      }
      reject(error)
    }
  })
}
