import { FC, useMemo } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { useRouteEditor } from 'services/routeEditor'
import DraggableList from 'components/DraggableList'
import Point from './Point'
import Placeholder from './Placeholder'
import RouteProps from './Route.props'

const Route: FC<RouteProps> = ({ className }) => {
  const { route, deletePoint, updateRoute } = useRouteEditor()

  const list = useMemo(() => {
    return map(route, (address) => ({
      ...address,
      id: `${address.point.lat}::${address.point.lon}`,
    }))
  }, [route])

  return (
    <>
      {!isEmpty(list) ? (
        <DraggableList
          className={cn(className, 'py-2')}
          list={list}
          renderItem={(address) => (
            <Point
              key={address.id}
              point={address}
              onDelete={() => deletePoint(address)}
            />
          )}
          onUpdate={updateRoute}
        />
      ) : (
        <Placeholder />
      )}
    </>
  )
}

export default Route
