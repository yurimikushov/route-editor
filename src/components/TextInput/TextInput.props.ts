type TextInputProps = {
  className?: string
  type?: 'text' | 'search' | 'email' | 'tel'
  value: string
  placeholder?: string
  hasClear?: boolean
  onChange: (value: string) => void
}

export default TextInputProps
