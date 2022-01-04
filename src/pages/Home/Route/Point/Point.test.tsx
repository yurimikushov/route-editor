import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import Point from './Point'

// eslint-disable-next-line react/display-name
jest.mock('components/ClearButton', () => (props: { className?: string }) => (
  <button {...props}>Clear</button>
))

it('should render point', () => {
  const tree1 = renderer
    .create(
      <Point
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
  expect(tree1).toMatchSnapshot()

  const tree2 = renderer
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
  expect(tree2).toMatchSnapshot()
})
