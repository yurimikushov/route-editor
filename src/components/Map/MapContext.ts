import { createContext, useContext } from 'react'
import { Map } from 'yandex-maps'
import isNull from 'lodash/isNull'

const MapContext = createContext<Map | null>(null)

const useMap = () => {
  const map = useContext(MapContext)

  if (isNull(map)) {
    throw new Error('[Map] Map should be created before it usage')
  }

  return map
}

export default MapContext
export { useMap }
