import { FC, useState } from 'react'
import filter from 'lodash/filter'
import { Address } from './model'
import RouteEditorContext from './RouteEditorContext'

const RouteEditorProvider: FC = ({ children }) => {
  const [route, setRoute] = useState<Array<Address>>([])

  const handleAddRoute = (address: Address) => {
    setRoute((route) => [...route, address])
  }

  const handleDeleteRoute = (address: Address) => {
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
        addRoute: handleAddRoute,
        deleteRoute: handleDeleteRoute,
      }}
    >
      {children}
    </RouteEditorContext.Provider>
  )
}

export default RouteEditorProvider
