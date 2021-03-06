import { useContext } from 'react'
import renderer from 'react-test-renderer'
import ymaps from 'yandex-maps'
import useCreateMap from './hooks/useCreateMap'
import MapContext from './MapContext'
import Map from './Map'

// eslint-disable-next-line react/display-name
jest.mock('components/Spinner', () => (props: { className?: string }) => (
  <span {...props}>Spinner</span>
))

jest.mock('./hooks/useCreateMap')

const runMockUseCreateMap = (result: ReturnType<typeof useCreateMap>) => {
  // @ts-expect-error bad typing
  useCreateMap.mockImplementation(() => result)
}

it('should display spinner during map creation', () => {
  runMockUseCreateMap({
    isCreating: true,
    map: null,
    error: null,
  })

  const tree = renderer.create(<Map />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should display map when map is created', () => {
  runMockUseCreateMap({
    isCreating: false,
    map: {} as ymaps.Map,
    error: null,
  })

  const tree = renderer.create(<Map />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('should display map and passed children when map is created', () => {
  runMockUseCreateMap({
    isCreating: false,
    map: {} as ymaps.Map,
    error: null,
  })

  const tree = renderer
    .create(
      <Map>
        <div>Some children</div>
      </Map>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('should provide map to children component by useContext', () => {
  const map = {} as ymaps.Map

  runMockUseCreateMap({
    isCreating: false,
    map,
    error: null,
  })

  let result: ymaps.Map | null = null

  const ChildComponent = () => {
    result = useContext(MapContext)
    return null
  }

  renderer.create(
    <Map>
      <ChildComponent />
    </Map>
  )

  expect(result).toBe(map)
})

it('should display error message when map creation is failed', () => {
  runMockUseCreateMap({
    isCreating: false,
    map: null,
    error: new Error(),
  })

  const tree = renderer.create(<Map />).toJSON()
  expect(tree).toMatchSnapshot()
})
