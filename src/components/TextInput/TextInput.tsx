import { ChangeEvent, FC, useRef } from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { ReactComponent as ClearIcon } from 'icons/clear.svg'
import TextInputProps from './TextInput.props'

const TextInput: FC<TextInputProps> = ({
  className,
  type = 'text',
  value,
  hasClear = false,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleClear = () => {
    inputRef.current?.focus()
    onChange('')
  }

  const shouldDisplayClear = hasClear && !isEmpty(value)

  return (
    <div
      className={cn(
        className,
        'px-3 py-2',
        'inline-flex items-center',
        'border-2 border-gray-300 rounded-md',
        'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500'
      )}
    >
      <input
        {...props}
        ref={inputRef}
        type={type}
        className={cn(className, 'focus:outline-none', {
          'w-[calc(100%-theme(space.5))]': shouldDisplayClear,
        })}
        value={value}
        onChange={handleChange}
      />
      {shouldDisplayClear && (
        <button
          className={cn(
            'w-5 h-5 min-w-5 min-h-5',
            'text-gray-500 hover:text-black',
            'focus:outline-none rounded-md focus-visible:ring-2 focus-visible:ring-indigo-500'
          )}
          type='reset'
          data-testid='clear-text-input'
          onClick={handleClear}
        >
          <ClearIcon />
        </button>
      )}
    </div>
  )
}

export default TextInput
