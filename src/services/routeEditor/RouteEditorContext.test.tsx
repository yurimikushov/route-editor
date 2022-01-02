import { FC } from 'react'
import { render } from '@testing-library/react'
import RouteEditorContext, { useRouteEditor } from './RouteEditorContext'
import { RouteEditor } from './model'

it('should return route editor when it is provided', () => {
  let result: RouteEditor | null = null

  const TextComponent: FC = () => {
    result = useRouteEditor()
    return null
  }

  const mockRouteEditor = {} as RouteEditor

  render(
    <RouteEditorContext.Provider value={mockRouteEditor}>
      <TextComponent />
    </RouteEditorContext.Provider>
  )

  expect(result).toBe(mockRouteEditor)
})

it(`should throw error when route editor isn't provided`, () => {
  const TextComponent: FC = () => {
    useRouteEditor()
    return null
  }

  expect(() => render(<TextComponent />)).toThrow(
    new Error('[Route editor] Route editor should be created before it usage')
  )
})
