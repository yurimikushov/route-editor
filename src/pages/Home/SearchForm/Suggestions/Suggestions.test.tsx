import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import { Suggestion } from 'services/suggestions'
import useSuggestions from './hooks/useSuggestions'
import SuggestionProps from './Suggestion/Suggestion.props'
import Suggestions from './Suggestions'

// eslint-disable-next-line react/display-name
jest.mock('./Suggestion', () => (props: SuggestionProps) => (
  <li {...props} data-testId={props.suggestion.name}>
    Suggestion
  </li>
))

jest.mock('./hooks/useSuggestions')

const runMockUseSuggestions = (result: ReturnType<typeof useSuggestions>) => {
  // @ts-expect-error bad typing
  useSuggestions.mockImplementation(() => result)
}

it(`should render suggestions when suggestions isn't empty`, () => {
  runMockUseSuggestions({
    highlightedSuggestion: -1,
  })

  const tree = renderer
    .create(
      <Suggestions
        className='some-class-name'
        suggestions={[
          {
            name: 'Balalyaka',
            description: 'Some description',
            point: {
              lat: 0,
              lon: 0,
            },
          },
        ]}
        onChoose={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render empty container when suggestions is empty', () => {
  runMockUseSuggestions({
    highlightedSuggestion: -1,
  })

  const tree = renderer
    .create(
      <Suggestions
        className='some-class-name'
        suggestions={[]}
        onChoose={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it(`should highlight suggestion when useSuggestions return positive index`, () => {
  runMockUseSuggestions({
    highlightedSuggestion: 1,
  })

  const tree = renderer
    .create(
      <Suggestions
        className='some-class-name'
        suggestions={[
          {
            name: 'Balalyaka',
            description: 'Some description',
            point: {
              lat: 0,
              lon: 0,
            },
          },
          {
            name: 'Vodka',
            description: 'Some description',
            point: {
              lat: 1,
              lon: 2,
            },
          },
          {
            name: 'Pelmeny',
            description: 'Some description',
            point: {
              lat: 2,
              lon: 2,
            },
          },
        ]}
        onChoose={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should call onChoose when suggestion is chosen', () => {
  runMockUseSuggestions({
    highlightedSuggestion: -1,
  })

  let result: Suggestion | null = null
  const handleChoose = jest.fn((suggestion: Suggestion) => {
    result = suggestion
  })

  const mockSuggestion = {
    name: 'Balalyaka',
    description: 'Some description',
    point: {
      lat: 0,
      lon: 0,
    },
  }

  render(
    <Suggestions
      className='some-class-name'
      suggestions={[mockSuggestion]}
      onChoose={handleChoose}
    />
  )

  fireEvent.mouseDown(screen.getByTestId('Balalyaka'))

  expect(result).toBe(mockSuggestion)
  expect(handleChoose).toHaveBeenCalledTimes(1)
})
