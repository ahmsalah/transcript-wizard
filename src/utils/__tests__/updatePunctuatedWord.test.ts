import { updatePunctuatedWord } from '../updatePunctuatedWord'

describe('updatePunctuatedWord', () => {
  it('should update a punctuated word with a new word when punctuation is present', () => {
    const originalWord = 'Hello,'
    const newWord = 'Hi'
    const updatedWord = updatePunctuatedWord(originalWord, newWord)
    expect(updatedWord).toBe('Hi,')
  })

  it('should update a punctuated word with a new word when no punctuation is present', () => {
    const originalWord = 'Hello'
    const newWord = 'Hi'
    const updatedWord = updatePunctuatedWord(originalWord, newWord)
    expect(updatedWord).toBe('Hi')
  })

  it('should handle punctuated word without a current word', () => {
    const originalWord = ','
    const newWord = 'Hi'
    const updatedWord = updatePunctuatedWord(originalWord, newWord)
    expect(updatedWord).toBe('Hi,')
  })
})
