import { FC, useContext } from 'react'
import cn from 'classnames'
import isNull from 'lodash/isNull'
import MapContext from '../../MapContext'
import Control from './Control'
import ZoomControlProps from './ZoomControl.props'

const ZoomControl: FC<ZoomControlProps> = ({ className }) => {
  const map = useContext(MapContext)

  if (isNull(map)) {
    throw new Error('[Map] Map should be created before it usage')
  }

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
