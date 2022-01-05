import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import Suggestion from './Suggestion'

it('should render highlighted suggestion', () => {
  const tree = renderer
    .create(
      <Suggestion
        className='some-class-name'
        isHighlighted
        suggestion={{
          name: 'Balalyaka',
          description: 'Some description',
          point: {
            lat: 0,
            lon: 0,
          },
        }}
        onMouseDown={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render non-highlighted suggestion', () => {
  const tree = renderer
    .create(
      <Suggestion
        className='some-class-name'
        isHighlighted={false}
        suggestion={{
          name: 'Balalyaka',
          description: 'Some description',
          point: {
            lat: 0,
            lon: 0,
          },
        }}
        onMouseDown={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should call onMouseDown when is mouse down', () => {
  let isClicked = false
  const handleMouseDown = jest.fn(() => {
    isClicked = true
  })

  render(
    <Suggestion
      className='some-class-name'
      isHighlighted
      suggestion={{
        name: 'Balalyaka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      }}
      testId='suggestion'
      onMouseDown={handleMouseDown}
    />
  )

  fireEvent.mouseDown(screen.getByTestId('suggestion'))

  expect(isClicked).toBeTruthy()
  expect(handleMouseDown).toHaveBeenCalledTimes(1)
})
