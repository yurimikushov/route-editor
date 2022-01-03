import { FC, useMemo, useState } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import { Address, Point, useRouteEditor } from 'services/routeEditor'
import NativeMap, { Placemark, Polyline, ZoomControl } from 'components/Map'
import MapProps from './Map.props'

const Map: FC<MapProps> = ({ className }) => {
  const { route, changePoint } = useRouteEditor()
  const [isPointDragging, setIsPointDragging] = useState(false)

  const mapPoints = useMemo(() => {
    return map(route, ({ point }) => point)
  }, [route])

  const handleDragPointStart = () => {
    setIsPointDragging(true)
  }

  const handleDragPointEnd = (address: Address, point: Point) => {
    setIsPointDragging(false)
    changePoint(address, point)
  }

  return (
    <NativeMap className={cn(className, 'relative bg-gray-50')}>
      <ZoomControl className='absolute top-1/2 right-4 transform -translate-y-1/2' />
      {map(route, (address) => (
        <Placemark
          key={`${address.point.lat}::${address.point.lon}`}
          point={address.point}
          preset='islands#blueCircleIcon'
          balloonContent={address.name}
          draggable
          onDragStart={handleDragPointStart}
          onDragEnd={(point) => handleDragPointEnd(address, point)}
        />
      ))}
      {!isPointDragging && <Polyline points={mapPoints} />}
    </NativeMap>
  )
}

export default Map
