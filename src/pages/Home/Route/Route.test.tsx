import renderer from 'react-test-renderer'
import noop from 'lodash/noop'
import { useRouteEditor } from 'services/routeEditor'
import Route from './Route'

jest.mock('services/routeEditor')

// eslint-disable-next-line react/display-name
jest.mock('./Point', () => (props: { className?: string }) => (
  <div {...props}></div>
))

// eslint-disable-next-line react/display-name
jest.mock('./Placeholder', () => (props: { className?: string }) => (
  <div {...props}>Placeholder</div>
))

const runMockUseRouteEditor = (result: ReturnType<typeof useRouteEditor>) => {
  // @ts-expect-error bad typing
  useRouteEditor.mockImplementation(() => result)
}

it(`should render draggable points when route contains more than 1 element`, () => {
  runMockUseRouteEditor({
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 1,
          lon: 1,
        },
      },
    ],
    addAddress: noop,
    changeAddress: noop,
    deleteAddress: noop,
    updateRoute: noop,
  })

  const tree = renderer.create(<Route />).toJSON()
  expect(tree).toMatchSnapshot()
})

it(`should render non-draggable point when route contains 1 element`, () => {
  runMockUseRouteEditor({
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 1,
          lon: 1,
        },
      },
    ],
    addAddress: noop,
    changeAddress: noop,
    deleteAddress: noop,
    updateRoute: noop,
  })

  const tree = renderer.create(<Route />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should render placeholder when route is empty', () => {
  runMockUseRouteEditor({
    route: [],
    addAddress: noop,
    changeAddress: noop,
    deleteAddress: noop,
    updateRoute: noop,
  })

  const tree = renderer.create(<Route />).toJSON()
  expect(tree).toMatchSnapshot()
})
