import {
  ChangeEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import nonNullable from 'lib/nonNullable'
import useEffectWhen from 'hooks/useEffectWhen'
import ClearButton from 'components/ClearButton'
import TextInputProps from './TextInput.props'

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  {
    className,
    type = 'text',
    value,
    autoFocus = false,
    hasClear = false,
    onChange,
    ...props
  },
  externalRef
) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(externalRef, () => nonNullable(inputRef.current), [])

  useEffectWhen(() => {
    inputRef.current?.focus()
  }, autoFocus)

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
        <ClearButton
          className='w-5 h-5 min-w-5 min-h-5'
          onClick={handleClear}
        />
      )}
    </div>
  )
}

export default forwardRef(TextInput)
