import { FC } from 'react'
import { render } from '@testing-library/react'
import SuggestionsContext, { useSuggestions } from './SuggestionsContext'
import { Suggestions } from './model'

it('should return suggestions when it are provided', () => {
  let result: Suggestions | null = null

  const TextComponent: FC = () => {
    result = useSuggestions()
    return null
  }

  const mockSuggestions = {} as Suggestions

  render(
    <SuggestionsContext.Provider value={mockSuggestions}>
      <TextComponent />
    </SuggestionsContext.Provider>
  )

  expect(result).toBe(mockSuggestions)
})

it(`should throw error when suggestions aren't provided`, () => {
  const TextComponent: FC = () => {
    useSuggestions()
    return null
  }

  expect(() => render(<TextComponent />)).toThrow(
    new Error('[Suggestions] Suggestions should be created before it usage')
  )
})
