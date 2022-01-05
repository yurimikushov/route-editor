import { FC } from 'react'
import cn from 'classnames'
import Dragger from 'components/Dragger'
import ClearButton from 'components/ClearButton'
import PointProps from './Point.props'

const Point: FC<PointProps> = ({
  className,
  isDraggable = false,
  point,
  onDelete,
}) => {
  return (
    <div
      className={cn(
        className,
        'my-3 px-3 py-2',
        'flex justify-between items-center',
        'bg-gray-100 rounded'
      )}
    >
      <div className='flex flex-col'>
        <span className='text-gray-600'>{point.name}</span>
        <span className='text-sm text-gray-400'>{point.description}</span>
      </div>
      <div className='flex items-center gap-1'>
        {isDraggable && <Dragger className='w-6 h-6 min-w-6 min-h-6' />}
        <ClearButton className='w-5 h-5 min-w-5 min-h-5' onClick={onDelete} />
      </div>
    </div>
  )
}

export default Point
