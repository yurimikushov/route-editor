import { FC } from 'react'
import cn from 'classnames'
import ClearButton from 'components/ClearButton'
import PointProps from './Point.props'

const Point: FC<PointProps> = ({ className, point, onDelete }) => {
  return (
    <li
      className={cn(
        className,
        'my-3 px-3 py-2',
        'flex justify-between items-center',
        'bg-gray-100 rounded'
      )}
    >
      <span className='text-gray-600'>{point.name}</span>
      <ClearButton onClick={onDelete} />
    </li>
  )
}

export default Point
