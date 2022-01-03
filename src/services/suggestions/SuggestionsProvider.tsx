import { FC, useState } from 'react'
import { geocodeByAddress } from 'api/geocoder'
import { Suggestion } from './model'
import SuggestionsContext from './SuggestionsContext'

const SuggestionsProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([])
  const [error, setError] = useState<Error | null>(null)

  const handleLoad = async (address: string) => {
    setIsLoading(true)

    try {
      setSuggestions(await geocodeByAddress(address))
    } catch (error) {
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setSuggestions([])
  }

  return (
    <SuggestionsContext.Provider
      value={{
        isLoading,
        suggestions,
        error,
        load: handleLoad,
        clear: handleClear,
      }}
    >
      {children}
    </SuggestionsContext.Provider>
  )
}

export default SuggestionsProvider
