import { FC, useState } from 'react'
import cn from 'classnames'
import size from 'lodash/size'
import map from 'lodash/map'
import useKeyDown from 'hooks/useKeyDown'
import Suggestion from './Suggestion'
import SuggestionsProps from './Suggestions.props'

const Suggestions: FC<SuggestionsProps> = ({
  className,
  suggestions,
  onChoose,
}) => {
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

  return (
    <ul className={cn(className, 'py-1 w-full rounded-md shadow-lg')}>
      {map(suggestions, (suggestion, i) => (
        <Suggestion
          key={`${suggestion.point.lat}::${suggestion.point.lon}`}
          isHighlighted={highlightedSuggestion === i}
          suggestion={suggestion}
          onChoose={() => onChoose(suggestion)}
        />
      ))}
    </ul>
  )
}

export default Suggestions
