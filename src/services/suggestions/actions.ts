import { LOAD_BEGIN, LOAD_SUCCESS, LOAD_FAIL, CLEAR } from './constants'
import { Suggestion } from './model'

const loadBegin = () =>
  ({
    type: LOAD_BEGIN,
  } as const)

const loadSuccess = (suggestions: Array<Suggestion>) =>
  ({
    type: LOAD_SUCCESS,
    payload: {
      suggestions,
    },
  } as const)

const loadFail = (error: Error) =>
  ({
    type: LOAD_FAIL,
    payload: {
      error,
    },
  } as const)

const clear = () =>
  ({
    type: CLEAR,
  } as const)

type LoadBegin = ReturnType<typeof loadBegin>
type LoadSuccess = ReturnType<typeof loadSuccess>
type LoadFail = ReturnType<typeof loadFail>
type Clear = ReturnType<typeof clear>

type Action = LoadBegin | LoadSuccess | LoadFail | Clear

export { loadBegin, loadSuccess, loadFail, clear }
export type { Action }
