import { createContext } from 'react'
import { Map } from 'yandex-maps'

const MapContext = createContext<Map | null>(null)

export default MapContext
