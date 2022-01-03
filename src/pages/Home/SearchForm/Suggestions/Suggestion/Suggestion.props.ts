import { Suggestion } from 'services/suggestions'

type SuggestionProps = {
  className?: string
  isHighlighted: boolean
  suggestion: Suggestion
  onChoose: () => void
}

export default SuggestionProps
