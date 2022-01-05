import { useState } from 'react'
import size from 'lodash/size'
import { Suggestion } from 'services/suggestions'
import useKeyDown from 'hooks/useKeyDown'

const useSuggestions = (
  suggestions: Array<Suggestion>,
  onChoose: (suggestion: Suggestion) => void
) => {
  const [highlightedSuggestion, setHighlightedSuggestion] = useState(-1)

  useKeyDown(
    'ArrowUp',
    () => {
      setHighlightedSuggestion((highlightedSuggestion) => {
        if (highlightedSuggestion === -1) {
          return size(suggestions) - 1
        }

        return highlightedSuggestion - 1
      })
    },
    [suggestions]
  )

  useKeyDown(
    'ArrowDown',
    () => {
      setHighlightedSuggestion((highlightedSuggestion) => {
        if (highlightedSuggestion === size(suggestions) - 1) {
          return 0
        }

        return highlightedSuggestion + 1
      })
    },
    [suggestions]
  )

  useKeyDown(
    'Enter',
    () => {
      if (highlightedSuggestion === -1) {
        return
      }

      onChoose(suggestions[highlightedSuggestion])
    },
    [highlightedSuggestion, suggestions]
  )

  useKeyDown(
    'Space',
    (e: KeyboardEvent) => {
      if (highlightedSuggestion === -1) {
        return
      }

      e.preventDefault()
      onChoose(suggestions[highlightedSuggestion])
    },
    [highlightedSuggestion, suggestions]
  )

  return { highlightedSuggestion }
}

export default useSuggestions
