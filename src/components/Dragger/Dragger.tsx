import { FC } from 'react'
import cn from 'classnames'
import { ReactComponent as DraggerIcon } from 'icons/dragger.svg'
import DraggerProps from './Dragger.props'

const Dragger: FC<DraggerProps> = ({ className }) => {
  return (
    <DraggerIcon className={cn(className, 'text-gray-500 hover:text-black')} />
  )
}

export default Dragger
