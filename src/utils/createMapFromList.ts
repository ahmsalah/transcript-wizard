/**
 * Creates a `Map` object from an array of items, using a key selector function to determine the keys.
 *
 * @param list - The array of items to create the map from.
 * @param keySelector - A function that takes an item and returns its key.
 * @returns A `Map` object with the keys and values from the input array.
 *
 * @typeParam T - The type of items in the input array.
 */
export const createMapFromList = <T>(
  list: T[],
  keySelector: (item: T) => string,
): Map<string, T> => {
  return list.reduce((map, item) => {
    const key = keySelector(item)
    map.set(key, item)
    return map
  }, new Map<string, T>())
}
