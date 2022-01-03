import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import TextInput from './TextInput'

it('should render text input', () => {
  const tree = renderer.create(<TextInput value='' onChange={noop} />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render text input without clear btn', () => {
  const tree = renderer
    .create(
      <TextInput
        value='123'
        placeholder='Type here'
        onChange={noop}
        onFocus={noop}
        onBlur={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render text input with clear btn', () => {
  const tree = renderer
    .create(<TextInput value='123' hasClear onChange={noop} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should call onChange when some text is typed', () => {
  let currentValue = ''
  const handleChange = jest.fn((value: string) => {
    currentValue = value
  })

  const component = render(
    <TextInput
      value={currentValue}
      placeholder='Type here'
      onChange={handleChange}
    />
  )

  const textInput = screen.getByDisplayValue(currentValue)

  fireEvent.change(textInput, { target: { value: 'q' } })
  fireEvent.change(textInput, { target: { value: 'qw' } })
  fireEvent.change(textInput, { target: { value: 'qwe' } })
  fireEvent.change(textInput, { target: { value: 'qwer' } })
  fireEvent.change(textInput, { target: { value: 'qwert' } })
  fireEvent.change(textInput, { target: { value: 'qwerty' } })

  expect(currentValue).toBe('qwerty')
  expect(handleChange).toHaveBeenCalledTimes(6)

  currentValue = '123456'
  component.rerender(<TextInput value={currentValue} onChange={handleChange} />)

  fireEvent.change(textInput, { target: { value: '12345' } })
  fireEvent.change(textInput, { target: { value: '1234' } })

  expect(currentValue).toBe('1234')
  expect(handleChange).toHaveBeenCalledTimes(8)
})

it('should call onChange with empty value when clear btn is clicked', () => {
  let currentValue = 'qwerty'
  const handleChange = jest.fn((value: string) => {
    currentValue = value
  })

  render(
    <TextInput
      value={currentValue}
      placeholder='Type here'
      hasClear
      onChange={handleChange}
    />
  )

  fireEvent.click(screen.getByTestId('clear-text-input'))

  expect(currentValue).toBe('')
  expect(handleChange).toHaveBeenCalledTimes(1)
})

it('should focus input when clear btn is clicked', () => {
  render(
    <TextInput
      value='qwerty'
      placeholder='Type here'
      hasClear
      onChange={noop}
    />
  )

  fireEvent.click(screen.getByTestId('clear-text-input'))

  expect(document.activeElement).toBe(screen.getByDisplayValue('qwerty'))
})
