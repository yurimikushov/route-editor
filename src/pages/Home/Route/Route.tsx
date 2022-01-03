import { FC } from 'react'
import cn from 'classnames'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import { useRouteEditor } from 'services/routeEditor'
import Point from './Point'
import RouteProps from './Route.props'

const Route: FC<RouteProps> = ({ className }) => {
  const { route, deletePoint } = useRouteEditor()

  return (
    <ul className={cn(className, 'py-2')}>
      {map(route, (address) => (
        <Point
          key={`${address.point.lat}::${address.point.lon}`}
          point={address}
          onDelete={() => deletePoint(address)}
        />
      ))}
      {isEmpty(route) && (
        <div
          className={cn(
            'w-full h-24 p-3',
            'flex justify-center items-center',
            'text-sm text-gray-500'
          )}
        >
          Маршрут пока пустой
        </div>
      )}
    </ul>
  )
}

export default Route
