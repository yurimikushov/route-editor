type Suggestions = {
  isLoading: boolean
  suggestions: Array<Suggestion>
  error: Error | null
  load: (address: string) => Promise<void>
  clear: () => void
}

type Suggestion = {
  name: string
  description: string
  point: { lat: number; lon: number }
}

export type { Suggestions, Suggestion }
