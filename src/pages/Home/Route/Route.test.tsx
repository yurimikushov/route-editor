import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import { useRouteEditor } from 'services/routeEditor'
import Route from './Route'

// eslint-disable-next-line react/display-name
jest.mock('./Point/Point', () => (props: { className?: string }) => (
  <li {...props}></li>
))

jest.mock('services/routeEditor')

const runMockUseRouteEditor = (result: ReturnType<typeof useRouteEditor>) => {
  // @ts-expect-error bad typing
  useRouteEditor.mockImplementation(() => result)
}

it(`should render points when route isn't empty`, () => {
  runMockUseRouteEditor({
    route: [
      {
        name: 'Balalayka',
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
          lat: 0,
          lon: 0,
        },
      },
    ],
    addPoint: noop,
    deletePoint: noop,
  })

  const tree = renderer.create(<Route />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render empty container when route is empty', () => {
  runMockUseRouteEditor({
    route: [],
    addPoint: noop,
    deletePoint: noop,
  })

  const tree = renderer.create(<Route />).toJSON()
  expect(tree).toMatchSnapshot()
})