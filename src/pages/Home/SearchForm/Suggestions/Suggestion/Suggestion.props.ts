import { Suggestion } from 'services/suggestions'

type SuggestionProps = {
  className?: string
  isHighlighted: boolean
  suggestion: Suggestion
  testId?: string
  onMouseDown: () => void
}

export default SuggestionProps
