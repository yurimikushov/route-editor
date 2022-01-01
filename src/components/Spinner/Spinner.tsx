import { FC } from 'react'
import cn from 'classnames'
import { ReactComponent as SpinnerIcon } from 'icons/spinner.svg'
import SpinnerProps from './Spinner.props'

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <SpinnerIcon className={cn(className, 'text-indigo-500 animate-spin')} />
  )
}

export default Spinner
