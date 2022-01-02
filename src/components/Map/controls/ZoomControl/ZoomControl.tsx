import { FC } from 'react'
import cn from 'classnames'
import { useMap } from 'components/Map'
import Control from './Control'
import ZoomControlProps from './ZoomControl.props'

const ZoomControl: FC<ZoomControlProps> = ({ className }) => {
  const map = useMap()

  const handleIncreaseZoom = () => {
    map.setZoom(map.getZoom() + 1, {
      duration: 300,
    })
  }

  const handleDecreaseZoom = () => {
    map.setZoom(map.getZoom() - 1, {
      duration: 300,
    })
  }

  return (
    <div
      className={cn(
        className,
        'inline-flex flex-col',
        'bg-white rounded-md',
        'shadow-lg hover:shadow-xl'
      )}
    >
      <Control onClick={handleIncreaseZoom}>+</Control>
      <Control onClick={handleDecreaseZoom}>-</Control>
    </div>
  )
}

export default ZoomControl
