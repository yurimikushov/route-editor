import { Suggestion } from 'services/suggestions'

type SuggestionProps = {
  className?: string
  isHighlighted: boolean
  suggestion: Suggestion
  onSelect: () => void
}

export default SuggestionProps
