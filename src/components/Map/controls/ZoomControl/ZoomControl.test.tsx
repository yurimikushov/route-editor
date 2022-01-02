import { fireEvent, render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Map as YMap } from 'yandex-maps'
import MapContext from '../../MapContext'
import ZoomControl from './ZoomControl'

it('should render both + and - controls', () => {
  const tree = renderer
    .create(
      <MapContext.Provider value={{} as YMap}>
        <ZoomControl />
      </MapContext.Provider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})

it(`should throw error when map isn't provided`, () => {
  expect(() => render(<ZoomControl />)).toThrowError()
})

it('should increase zoom when + is clicked', () => {
  let currentZoom = 9

  const mockMap = {
    getZoom: jest.fn(() => currentZoom),
    setZoom: jest.fn((zoom: number) => {
      currentZoom = zoom
      return Promise.resolve()
    }),
  } as unknown as YMap

  render(
    <MapContext.Provider value={mockMap}>
      <ZoomControl />
    </MapContext.Provider>
  )

  fireEvent.click(screen.getByText('+'))

  expect(mockMap.getZoom).toHaveBeenCalledTimes(1)
  expect(mockMap.setZoom).toHaveBeenCalledTimes(1)
  expect(mockMap.setZoom).toHaveBeenCalledWith(10, { duration: 300 })

  fireEvent.click(screen.getByText('+'))
  fireEvent.click(screen.getByText('+'))

  expect(mockMap.getZoom).toHaveBeenCalledTimes(3)
  expect(mockMap.setZoom).toHaveBeenCalledTimes(3)
  expect(mockMap.setZoom).toHaveBeenCalledWith(12, { duration: 300 })
  expect(mockMap.setZoom).toHaveBeenCalledWith(12, { duration: 300 })
})

it('should decrease zoom when - is clicked', () => {
  let currentZoom = 9

  const mockMap = {
    getZoom: jest.fn(() => currentZoom),
    setZoom: jest.fn((zoom: number) => {
      currentZoom = zoom
      return Promise.resolve()
    }),
  } as unknown as YMap

  render(
    <MapContext.Provider value={mockMap}>
      <ZoomControl />
    </MapContext.Provider>
  )

  fireEvent.click(screen.getByText('-'))

  expect(mockMap.getZoom).toHaveBeenCalledTimes(1)
  expect(mockMap.setZoom).toHaveBeenCalledTimes(1)
  expect(mockMap.setZoom).toHaveBeenCalledWith(8, { duration: 300 })

  fireEvent.click(screen.getByText('-'))
  fireEvent.click(screen.getByText('-'))

  expect(mockMap.getZoom).toHaveBeenCalledTimes(3)
  expect(mockMap.setZoom).toHaveBeenCalledTimes(3)
  expect(mockMap.setZoom).toHaveBeenCalledWith(7, { duration: 300 })
  expect(mockMap.setZoom).toHaveBeenCalledWith(6, { duration: 300 })
})
