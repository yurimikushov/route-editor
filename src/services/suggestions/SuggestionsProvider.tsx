import { FC, useReducer } from 'react'
import { geocodeByAddress } from 'api/geocoder'
import { clear, loadBegin, loadFail, loadSuccess } from './actions'
import { SuggestionsState } from './model'
import suggestionsReducer from './reducer'
import SuggestionsContext from './SuggestionsContext'

const initialState: SuggestionsState = {
  isLoading: false,
  suggestions: [],
  error: null,
}

const SuggestionsProvider: FC = ({ children }) => {
  const [{ isLoading, suggestions, error }, dispatch] = useReducer(
    suggestionsReducer,
    initialState
  )

  const handleLoad = async (address: string) => {
    dispatch(loadBegin())

    try {
      const suggestions = await geocodeByAddress(address)
      dispatch(loadSuccess(suggestions))
    } catch (error) {
      dispatch(loadFail(error as Error))
    }
  }

  const handleClear = () => {
    dispatch(clear())
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
