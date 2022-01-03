import { Suggestion } from 'services/suggestions'

type SuggestionProps = {
  className?: string
  suggestion: Suggestion
  onSelect: () => void
}

export default SuggestionProps
