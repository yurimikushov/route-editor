import { FC, useState } from 'react'
import { nanoid } from 'nanoid'
import map from 'lodash/map'
import reject from 'lodash/reject'
import { geocodeByCoords } from 'api/geocoder'
import { Address, NewAddress, Point } from './model'
import RouteEditorContext from './RouteEditorContext'

const RouteEditorProvider: FC = ({ children }) => {
  const [route, setRoute] = useState<Array<Address>>([])

  const handleAddPoint = (newAddress: NewAddress) => {
    setRoute((route) => [
      ...route,
      {
        ...newAddress,
        id: nanoid(),
      },
    ])
  }

  const handleChangePoint = async (id: string, newPoint: Point) => {
    setRoute((route) => {
      return map(route, (address) => {
        if (address.id === id) {
          return {
            id,
            name: 'Адрес обновляется...',
            description: '',
            point: newPoint,
          }
        }

        return address
      })
    })

    try {
      const newAddress = await geocodeByCoords(newPoint)

      setRoute((route) => {
        return map(route, (address) => {
          if (address.id === id) {
            return {
              ...newAddress,
              id,
            }
          }

          return address
        })
      })
    } catch {
      setRoute((route) => {
        return map(route, (address) => {
          if (address.id === id) {
            return {
              id,
              name: 'Не удалось обновить адрес',
              description: '',
              point: newPoint,
            }
          }

          return address
        })
      })
    }
  }

  const handleDeletePoint = (id: string) => {
    setRoute((route) => reject(route, { id }))
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
