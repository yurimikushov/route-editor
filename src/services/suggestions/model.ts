type Suggestions = {
  isLoading: boolean
  suggestions: Array<Suggestion>
  error: Error | null
  load: (address: string) => Promise<void>
  clear: () => void
}

type SuggestionsState = {
  isLoading: boolean
  suggestions: Array<Suggestion>
  error: Error | null
}

type Suggestion = {
  name: string
  description: string
  point: { lat: number; lon: number }
}

export type { Suggestions, SuggestionsState, Suggestion }
