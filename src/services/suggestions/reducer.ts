import { Action } from './actions'
import { LOAD_BEGIN, LOAD_SUCCESS, LOAD_FAIL, CLEAR } from './constants'
import { SuggestionsState } from './model'

const suggestionsReducer = (state: SuggestionsState, action: Action) => {
  switch (action.type) {
    case LOAD_BEGIN:
      return {
        ...state,
        isLoading: true,
        suggestions: [],
        error: null,
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        suggestions: action.payload.suggestions,
      }
    case LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    case CLEAR:
      return {
        ...state,
        suggestions: [],
      }
    default:
      return state
  }
}

export default suggestionsReducer
