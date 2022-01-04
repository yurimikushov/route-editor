import { nanoid } from 'nanoid'
import map from 'lodash/map'
import reject from 'lodash/reject'
import { Action } from './actions'
import {
  ADD_ADDRESS,
  CHANGE_ADDRESS_BEGIN,
  CHANGE_ADDRESS_SUCCESS,
  CHANGE_ADDRESS_FAIL,
  DELETE_ADDRESS,
  UPDATE_ROUTE,
} from './constants'
import { RouteEditorState } from './model'

const routeEditorReducer = (
  state: RouteEditorState,
  action: Action
): RouteEditorState => {
  switch (action.type) {
    case ADD_ADDRESS: {
      const { newAddress } = action.payload

      return {
        route: [
          ...state.route,
          {
            ...newAddress,
            id: nanoid(),
          },
        ],
      }
    }
    case CHANGE_ADDRESS_BEGIN: {
      const { id, newPoint } = action.payload

      return {
        route: map(state.route, (address) => {
          if (address.id === id) {
            return {
              id: id,
              name: 'Адрес обновляется...',
              description: '',
              point: newPoint,
            }
          }

          return address
        }),
      }
    }
    case CHANGE_ADDRESS_SUCCESS: {
      const { id, newAddress } = action.payload

      return {
        route: map(state.route, (address) => {
          if (address.id === id) {
            return {
              ...newAddress,
              id,
            }
          }

          return address
        }),
      }
    }
    case CHANGE_ADDRESS_FAIL: {
      const { id } = action.payload

      return {
        route: map(state.route, (address) => {
          if (address.id === id) {
            return {
              ...address,
              name: 'Не удалось обновить адрес',
              description: '',
            }
          }

          return address
        }),
      }
    }
    case DELETE_ADDRESS: {
      const { id } = action.payload

      return {
        route: reject(state.route, { id }),
      }
    }
    case UPDATE_ROUTE: {
      const { route } = action.payload

      return {
        route,
      }
    }
    default:
      return state
  }
}

export default routeEditorReducer
