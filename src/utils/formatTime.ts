/**
 * Formats a duration in seconds as a string in the format "hh:mm:ss".
 *
 * @param seconds - The duration in seconds.
 * @returns The formatted duration string.
 *
 * @example formatTime(90)  // "00:01:90"
 */
export const formatTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().slice(11, 19)
}
