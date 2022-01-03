import { FC, useState } from 'react'
import filter from 'lodash/filter'
import { Address } from './model'
import RouteEditorContext from './RouteEditorContext'

const RouteEditorProvider: FC = ({ children }) => {
  const [route, setRoute] = useState<Array<Address>>([])

  const handleAddPoint = (address: Address) => {
    setRoute((route) => [...route, address])
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
        deletePoint: handleDeletePoint,
      }}
    >
      {children}
    </RouteEditorContext.Provider>
  )
}

export default RouteEditorProvider
