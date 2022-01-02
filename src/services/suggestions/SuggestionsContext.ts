import isNull from 'lodash/isNull'
import { createContext, useContext } from 'react'
import { Suggestions } from './model'

const SuggestionsContext = createContext<Suggestions | null>(null)

const useSuggestions = () => {
  const suggestions = useContext(SuggestionsContext)

  if (isNull(suggestions)) {
    throw new Error(
      '[Suggestions] Suggestions should be created before it usage'
    )
  }

  return suggestions
}

export default SuggestionsContext
export { useSuggestions }
