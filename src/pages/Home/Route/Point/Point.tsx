import { FC } from 'react'
import cn from 'classnames'
import ClearButton from 'components/ClearButton'
import PointProps from './Point.props'

const Point: FC<PointProps> = ({ className, point, onDelete }) => {
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
      <ClearButton onClick={onDelete} />
    </div>
  )
}

export default Point
