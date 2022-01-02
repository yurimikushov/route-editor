import { FC } from 'react'
import cn from 'classnames'
import SuggestionsProps from './Suggestions.props'
import map from 'lodash/map'

const Suggestions: FC<SuggestionsProps> = ({
  className,
  suggestions,
  onSelect,
}) => {
  return (
    <ul className={cn(className, 'border-2 border-black')}>
      {map(suggestions, (suggestion) => (
        <li
          key={`${suggestion.point.lat}::${suggestion.point.lon}`}
          onClick={() => onSelect(suggestion)}
        >
          {suggestion.name}
        </li>
      ))}
    </ul>
  )
}

export default Suggestions
