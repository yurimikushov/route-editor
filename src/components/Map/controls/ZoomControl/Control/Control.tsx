import { FC } from 'react'
import cn from 'classnames'
import ControlProps from './Control.props'

const Control: FC<ControlProps> = ({ className, onClick, children }) => {
  return (
    <button
      className={cn(
        className,
        'px-3 py-2.5 rounded-md',
        'text-2xl text-gray-500 leading-none',
        'hover:text-black',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Control
