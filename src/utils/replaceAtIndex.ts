import { cloneDeep, fill } from 'lodash-es'

/**
 * Replace a value at a specific index in an array (Immutable).
 *
 * This function creates a new array with the same elements as the original
 * array but replaces the value at the specified index with the provided new value.
 *
 * @param array - The original array.
 * @param index - The index at which to replace the value.
 * @param newValue - The new value to partially replace the old value with.
 * @returns A new array with the partially replaced value.
 */
export function replaceAtIndex<T>(array: T[], index: number, newValue: Partial<T>): T[] {
  // Create a deep clone of the original array to ensure immutability
  const clonedArray = cloneDeep<T[]>(array)

  // Use the lodash `fill` function to replace the value at the specified index
  return fill(clonedArray, { ...clonedArray[index], ...newValue }, index, index + 1)
}
