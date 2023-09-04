import type { LocalStorageKey } from '@/types/LocalStorageKey'

/**
 * Save data to local storage.
 *
 * @param key - The union type representing the key under which the data will be saved.
 * @param data - The data to save to local storage.
 */
export function saveToLocalStorage<T>(key: LocalStorageKey, data: T): void {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
  } catch (error) {
    // Handle errors, e.g., local storage is full or data cannot be serialized
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error saving to local storage:', error)
    }
  }
}

/**
 * Retrieve data from local storage.
 *
 * @param key - The union type representing the key under which the data is saved in local storage.
 * @returns The retrieved data, or `null` if the key is not found.
 */
export function getFromLocalStorage<T>(key: LocalStorageKey): T | null {
  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData !== null) {
      return JSON.parse(serializedData) as T
    }
  } catch (error) {
    // Handle errors, e.g., data cannot be deserialized
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error retrieving from local storage:', error)
    }
  }

  return null // Key not found or error occurred
}
