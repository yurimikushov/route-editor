import { FC, useMemo, useState } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import { Point, useRouteEditor } from 'services/routeEditor'
import NativeMap, { Placemark, Polyline, ZoomControl } from 'components/Map'
import MapProps from './Map.props'

const Map: FC<MapProps> = ({ className }) => {
  const { route, changeAddress } = useRouteEditor()
  const [isPointDragging, setIsPointDragging] = useState(false)

  const mapPoints = useMemo(() => {
    return map(route, ({ point }) => point)
  }, [route])

  const handleDragPointStart = () => {
    setIsPointDragging(true)
  }

  const handleDragPointEnd = (id: string, point: Point) => {
    setIsPointDragging(false)
    changeAddress(id, point)
  }

  return (
    <NativeMap className={cn(className, 'relative bg-gray-50')}>
      <ZoomControl className='absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2' />
      {map(route, (address) => (
        <Placemark
          key={address.id}
          point={address.point}
          preset='islands#blueCircleIcon'
          balloonContent={address.name}
          draggable
          onDragStart={handleDragPointStart}
          onDragEnd={(point) => handleDragPointEnd(address.id, point)}
        />
      ))}
      {!isPointDragging && (
        <Polyline
          points={mapPoints}
          strokeWidth={5}
          strokeColor='#1e98fe'
          autoFocusOnLastPoint
        />
      )}
    </NativeMap>
  )
}

export default Map
