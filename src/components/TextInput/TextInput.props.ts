type TextInputProps = {
  className?: string
  type?: 'text' | 'search' | 'email' | 'tel'
  value: string
  placeholder?: string
  autoFocus?: boolean
  hasClear?: boolean
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export default TextInputProps
