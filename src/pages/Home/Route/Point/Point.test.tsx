import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import Point from './Point'

// eslint-disable-next-line react/display-name
jest.mock('components/Dragger', () => (props: { className?: string }) => (
  <div {...props}>Dragger</div>
))

// eslint-disable-next-line react/display-name
jest.mock('components/ClearButton', () => (props: { className?: string }) => (
  <button {...props}>Clear</button>
))

it('should render non-draggable point by default', () => {
  const tree = renderer
    .create(
      <Point
        point={{
          id: '2',
          name: 'Vodka',
          description: 'Some description',
          point: {
            lat: 0,
            lon: 0,
          },
        }}
        onDelete={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render draggable point when isDraggable prop is true', () => {
  const tree = renderer
    .create(
      <Point
        isDraggable
        point={{
          id: '1',
          name: 'Balalayka',
          description: 'Some description',
          point: {
            lat: 0,
            lon: 0,
          },
        }}
        onDelete={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render non-draggable point when isDraggable prop is false', () => {
  const tree = renderer
    .create(
      <Point
        isDraggable={false}
        point={{
          id: '1',
          name: 'Balalayka',
          description: 'Some description',
          point: {
            lat: 0,
            lon: 0,
          },
        }}
        onDelete={noop}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
