import { FC, useRef } from 'react'
import isNull from 'lodash/isNull'
import Spinner from 'components/Spinner'
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

  const { isCreating, map, error } = useCreateMap(containerRef, {
    center,
    zoom,
  })

  return (
    <MapContext.Provider value={map}>
      <div className={className}>
        <div
          ref={containerRef}
          className={'w-full h-full flex justify-center items-center'}
        >
          {isCreating && <Spinner className='w-10 h-10' />}
          {!isNull(map) && children}
          {!isNull(error) && (
            <span className='text-xl text-center'>
              Failed to load the map
              <br />
              Try refresh the page
            </span>
          )}
        </div>
      </div>
    </MapContext.Provider>
  )
}

export default Map
