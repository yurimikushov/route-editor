import {
  ADD_ADDRESS,
  CHANGE_ADDRESS_BEGIN,
  CHANGE_ADDRESS_SUCCESS,
  CHANGE_ADDRESS_FAIL,
  DELETE_ADDRESS,
  UPDATE_ROUTE,
} from './constants'
import { Address, NewAddress, Point } from './model'

const addAddress = (newAddress: NewAddress) =>
  ({
    type: ADD_ADDRESS,
    payload: {
      newAddress,
    },
  } as const)

const changeAddressBegin = (id: string, newPoint: Point) =>
  ({
    type: CHANGE_ADDRESS_BEGIN,
    payload: {
      id,
      newPoint,
    },
  } as const)

const changeAddressSuccess = (id: string, newAddress: NewAddress) =>
  ({
    type: CHANGE_ADDRESS_SUCCESS,
    payload: {
      id,
      newAddress,
    },
  } as const)

const changeAddressFail = (id: string) =>
  ({
    type: CHANGE_ADDRESS_FAIL,
    payload: {
      id,
    },
  } as const)

const deleteAddress = (id: string) =>
  ({
    type: DELETE_ADDRESS,
    payload: {
      id,
    },
  } as const)

const updateRoute = (route: Array<Address>) =>
  ({
    type: UPDATE_ROUTE,
    payload: {
      route,
    },
  } as const)

type AddAddress = ReturnType<typeof addAddress>
type ChangeAddressBegin = ReturnType<typeof changeAddressBegin>
type ChangeAddressSuccess = ReturnType<typeof changeAddressSuccess>
type ChangeAddressFail = ReturnType<typeof changeAddressFail>
type DeleteAddress = ReturnType<typeof deleteAddress>
type UpdateRoute = ReturnType<typeof updateRoute>

type Action =
  | AddAddress
  | ChangeAddressBegin
  | ChangeAddressSuccess
  | ChangeAddressFail
  | DeleteAddress
  | UpdateRoute

export {
  addAddress,
  changeAddressBegin,
  changeAddressSuccess,
  changeAddressFail,
  deleteAddress,
  updateRoute,
}
export type { Action }
