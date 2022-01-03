import { FC } from 'react'
import cn from 'classnames'
import SuggestionProps from './Suggestion.props'

const Suggestion: FC<SuggestionProps> = ({
  className,
  isHighlighted,
  suggestion,
  onSelect,
}) => {
  const { name, description, point } = suggestion

  return (
    <li
      key={`${point.lat}::${point.lon}`}
      className={cn(
        className,
        'px-2 py-1',
        'flex flex-col',
        !isHighlighted ? 'bg-white' : 'bg-gray-50',
        'cursor-pointer',
        'hover:bg-gray-50'
      )}
      onClick={onSelect}
    >
      <span className='text-sm text-black'>{name}</span>
      <span className='text-xs text-gray-400'>{description}</span>
    </li>
  )
}

export default Suggestion
