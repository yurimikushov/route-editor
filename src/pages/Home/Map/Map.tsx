import { FC } from 'react'
import cn from 'classnames'
import NativeMap, { ZoomControl } from 'components/Map'
import MapProps from './Map.props'

const Map: FC<MapProps> = ({ className }) => {
  return (
    <NativeMap className={cn(className, 'relative w-full h-screen bg-gray-50')}>
      <ZoomControl className='absolute top-1/2 right-4 transform -translate-y-1/2' />
    </NativeMap>
  )
}

export default Map
