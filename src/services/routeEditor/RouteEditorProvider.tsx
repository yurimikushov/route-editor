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
    setRoute((route) => {
      return map(route, (currentAddress) => {
        if (
          currentAddress.point.lat === address.point.lat &&
          currentAddress.point.lon === address.point.lon
        ) {
          return {
            name: 'Адрес обновляется...',
            description: '',
            point: newPoint,
          }
        }

        return currentAddress
      })
    })

    try {
      const newAddress = await geocodeByCoords(newPoint)

      setRoute((route) => {
        return map(route, (currentAddress) => {
          if (
            currentAddress.point.lat === newPoint.lat &&
            currentAddress.point.lon === newPoint.lon
          ) {
            return newAddress
          }

          return currentAddress
        })
      })
    } catch {
      setRoute((route) => {
        return map(route, (currentAddress) => {
          if (
            currentAddress.point.lat === newPoint.lat &&
            currentAddress.point.lon === newPoint.lon
          ) {
            return {
              name: 'Не удалось обновить адрес',
              description: '',
              point: newPoint,
            }
          }

          return currentAddress
        })
      })
    }
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

  const handleUpdateRoute = (route: Array<Address>) => {
    setRoute(route)
  }

  return (
    <RouteEditorContext.Provider
      value={{
        route,
        addPoint: handleAddPoint,
        changePoint: handleChangePoint,
        deletePoint: handleDeletePoint,
        updateRoute: handleUpdateRoute,
      }}
    >
      {children}
    </RouteEditorContext.Provider>
  )
}

export default RouteEditorProvider
