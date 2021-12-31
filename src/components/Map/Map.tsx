import { FC, useRef } from 'react'
import isNull from 'lodash/isNull'
import useCreateMap from './hooks/useCreateMap'
import MapContext from './MapContext'
import MapProps from './Map.props'

const MOSCOW = [55.751574, 37.573856]

const Map: FC<MapProps> = ({
  className,
  center = MOSCOW,
  zoom = 9,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { map } = useCreateMap(containerRef, {
    center,
    zoom,
  })

  return (
    <MapContext.Provider value={map}>
      <div className={className}>
        <div ref={containerRef} className={'relative w-full h-full'}>
          {isNull(map) ? null : children}
        </div>
      </div>
    </MapContext.Provider>
  )
}

export default Map
