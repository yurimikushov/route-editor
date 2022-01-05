import { FC } from 'react'
import cn from 'classnames'
import { ReactComponent as ClearIcon } from 'icons/clear.svg'
import ClearButtonProps from './ClearButton.props'

const ClearButton: FC<ClearButtonProps> = ({ className, onClick }) => {
  return (
    <button
      className={cn(
        className,
        'rounded-md text-gray-500 hover:text-black',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
      )}
      type='reset'
      onClick={onClick}
    >
      <ClearIcon />
    </button>
  )
}

export default ClearButton
