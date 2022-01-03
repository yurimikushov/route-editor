import { FC } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import { useRouteEditor } from 'services/routeEditor'
import NativeMap, { Placemark, ZoomControl } from 'components/Map'
import MapProps from './Map.props'

const Map: FC<MapProps> = ({ className }) => {
  const { route, changePoint } = useRouteEditor()

  return (
    <NativeMap className={cn(className, 'relative w-full h-screen bg-gray-50')}>
      <ZoomControl className='absolute top-1/2 right-4 transform -translate-y-1/2' />
      {map(route, (address) => (
        <Placemark
          key={`${address.point.lat}::${address.point.lon}`}
          point={address.point}
          preset='islands#blueCircleIcon'
          balloonContent={address.name}
          draggable
          onDragEnd={(point) => changePoint(address, point)}
        />
      ))}
    </NativeMap>
  )
}

export default Map
