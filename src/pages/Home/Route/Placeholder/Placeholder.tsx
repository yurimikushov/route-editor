import { FC } from 'react'
import cn from 'classnames'
import PlaceholderProps from './Placeholder.props'

const Placeholder: FC<PlaceholderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        'w-full h-24 p-3',
        'flex flex-col justify-center items-center'
      )}
    >
      <span className='text-md text-gray-500'>Здесь пока ничего нет</span>
      <span className='text-sm text-gray-500'>Добавьте первую точку</span>
    </div>
  )
}

export default Placeholder
