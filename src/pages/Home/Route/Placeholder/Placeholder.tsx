import { FC } from 'react'
import cn from 'classnames'
import PlaceholderProps from './Placeholder.props'

const Placeholder: FC<PlaceholderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'w-full h-24 p-3',
        'flex justify-center items-center',
        'text-sm text-gray-500'
      )}
    >
      Маршрут пока пустой
    </div>
  )
}

export default Placeholder
