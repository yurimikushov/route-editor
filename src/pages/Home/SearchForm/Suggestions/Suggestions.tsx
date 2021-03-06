import { FC } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import useSuggestions from './hooks/useSuggestions'
import Suggestion from './Suggestion'
import SuggestionsProps from './Suggestions.props'

const Suggestions: FC<SuggestionsProps> = ({
  className,
  suggestions,
  onChoose,
}) => {
  const { highlightedSuggestion } = useSuggestions(suggestions, onChoose)

  return (
    <ul
      className={cn(
        className,
        'py-1 w-full',
        'max-h-[30vh] md:max-h-[50vh]',
        'overflow-y-scroll md:overflow-y-auto',
        'bg-white rounded-md',
        'border border-gray-200 shadow-lg'
      )}
    >
      {map(suggestions, (suggestion, i) => (
        <Suggestion
          key={`${suggestion.point.lat}::${suggestion.point.lon}`}
          isHighlighted={highlightedSuggestion === i}
          suggestion={suggestion}
          onMouseDown={() => onChoose(suggestion)}
        />
      ))}
    </ul>
  )
}

export default Suggestions
