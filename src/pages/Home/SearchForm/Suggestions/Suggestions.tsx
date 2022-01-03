import { FC } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import Suggestion from './Suggestion'
import SuggestionsProps from './Suggestions.props'

const Suggestions: FC<SuggestionsProps> = ({
  className,
  suggestions,
  onSelect,
}) => {
  return (
    <ul className={cn(className, 'py-1 rounded-md shadow-lg')}>
      {map(suggestions, (suggestion) => (
        <Suggestion
          key={`${suggestion.point.lat}::${suggestion.point.lon}`}
          suggestion={suggestion}
          onSelect={() => onSelect(suggestion)}
        />
      ))}
    </ul>
  )
}

export default Suggestions
