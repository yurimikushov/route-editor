import { FC, useState } from 'react'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { geocodeByCoords } from 'api/geocoder/geocode'
import { Address, Point } from './model'
import RouteEditorContext from './RouteEditorContext'

const RouteEditorProvider: FC = ({ children }) => {
  const [route, setRoute] = useState<Array<Address>>([])

  const handleAddPoint = (address: Address) => {
    setRoute((route) => [...route, address])
  }

  const handleChangePoint = async (address: Address, newPoint: Point) => {
    const newAddress = await geocodeByCoords(newPoint)

    setRoute((route) => {
      return map(route, (currentAddress) => {
        if (
          currentAddress.point.lat === address.point.lat &&
          currentAddress.point.lon === address.point.lon
        ) {
          return newAddress
        }

        return currentAddress
      })
    })
  }

  const handleDeletePoint = (address: Address) => {
    setRoute((route) => {
      return filter(route, ({ point }) => {
        return (
          point.lat !== address.point.lat || point.lon !== address.point.lon
        )
      })
    })
  }

  return (
    <RouteEditorContext.Provider
      value={{
        route,
        addPoint: handleAddPoint,
        changePoint: handleChangePoint,
        deletePoint: handleDeletePoint,
      }}
    >
      {children}
    </RouteEditorContext.Provider>
  )
}

export default RouteEditorProvider
