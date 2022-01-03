import { Suggestion } from 'services/suggestions'

type SuggestionsProps = {
  className?: string
  suggestions: Array<Suggestion>
  onChoose: (suggestion: Suggestion) => void
}

export default SuggestionsProps
