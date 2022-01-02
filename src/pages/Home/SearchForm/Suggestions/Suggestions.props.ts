import { Suggestion } from 'services/suggestions'

type SuggestionsProps = {
  className?: string
  suggestions: Array<Suggestion>
  onSelect: (suggestion: Suggestion) => void
}

export default SuggestionsProps
