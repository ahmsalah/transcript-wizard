/**
 * Update a punctuated word with a new word.
 *
 * This function extracts the current word from the `punctuatedWord`,
 * replaces it with the `newWord`, and returns the updated word.
 *
 * @param punctuatedWord - The punctuated word to be replaced.
 * @param newWord - The new word to replace the `currentWord` in `punctuatedWord` with.
 * @returns The updated word with the `newWord`.
 */
export const updatePunctuatedWord = (punctuatedWord: string, newWord: string): string => {
  // Extract the current word (remove trailing punctuation)
  const currentWord = punctuatedWord.replace(/[.,!?;]+$/, '')

  // Replace the current word with the newWord
  return punctuatedWord.replace(currentWord, newWord)
}
