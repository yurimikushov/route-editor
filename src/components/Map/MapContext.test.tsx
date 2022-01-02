import { FC } from 'react'
import { render } from '@testing-library/react'
import ymaps from 'yandex-maps'
import MapContext, { useMap } from './MapContext'

it(`should return map when map is provided`, () => {
  let result: ymaps.Map | null = null

  const TextComponent: FC = () => {
    result = useMap()
    return null
  }

  const mockMap = {} as ymaps.Map

  render(
    <MapContext.Provider value={mockMap}>
      <TextComponent />
    </MapContext.Provider>
  )

  expect(result).toBe(mockMap)
})

it(`should throw error when map isn't provided`, () => {
  const TextComponent: FC = () => {
    useMap()
    return null
  }

  expect(() => render(<TextComponent />)).toThrow(
    new Error('[Map] Map should be created before it usage')
  )
})
