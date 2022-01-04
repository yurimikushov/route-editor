import { FC, useReducer } from 'react'
import { geocodeByCoords } from 'api/geocoder'
import {
  addAddress,
  changeAddressBegin,
  changeAddressSuccess,
  changeAddressFail,
  deleteAddress,
  updateRoute,
} from './actions'
import { Address, NewAddress, Point, RouteEditorState } from './model'
import routeEditorReducer from './reducer'
import RouteEditorContext from './RouteEditorContext'

const initialState: RouteEditorState = {
  route: [],
}

const RouteEditorProvider: FC = ({ children }) => {
  const [{ route }, dispatch] = useReducer(routeEditorReducer, initialState)

  const handleAddAddress = (newAddress: NewAddress) => {
    dispatch(addAddress(newAddress))
  }

  const handleChangeAddress = async (id: string, newPoint: Point) => {
    dispatch(changeAddressBegin(id, newPoint))

    try {
      const newAddress = await geocodeByCoords(newPoint)
      dispatch(changeAddressSuccess(id, newAddress))
    } catch {
      dispatch(changeAddressFail(id))
    }
  }

  const handleDeleteAddress = (id: string) => {
    dispatch(deleteAddress(id))
  }

  const handleUpdateRoute = (route: Array<Address>) => {
    dispatch(updateRoute(route))
  }

  return (
    <RouteEditorContext.Provider
      value={{
        route,
        addAddress: handleAddAddress,
        changeAddress: handleChangeAddress,
        deleteAddress: handleDeleteAddress,
        updateRoute: handleUpdateRoute,
      }}
    >
      {children}
    </RouteEditorContext.Provider>
  )
}

export default RouteEditorProvider
