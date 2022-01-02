import isNull from 'lodash/isNull'
import { createContext, useContext } from 'react'
import { RouteEditor } from './model'

const RouteEditorContext = createContext<RouteEditor | null>(null)

const useRouteEditor = () => {
  const routeEditor = useContext(RouteEditorContext)

  if (isNull(routeEditor)) {
    throw new Error(
      '[Route editor] Route editor should be created before it usage'
    )
  }

  return routeEditor
}

export default RouteEditorContext
export { useRouteEditor }
