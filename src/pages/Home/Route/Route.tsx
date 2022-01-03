import { FC } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import { useRouteEditor } from 'services/routeEditor'
import Point from './Point'
import RouteProps from './Route.props'

const Route: FC<RouteProps> = ({ className }) => {
  const { route, deletePoint } = useRouteEditor()

  return (
    <ul className={cn(className, 'py-2')}>
      {map(route, (point) => (
        <Point
          key={`${point.point.lat}::${point.point.lon}`}
          point={point}
          onDelete={() => deletePoint(point)}
        />
      ))}
    </ul>
  )
}

export default Route
