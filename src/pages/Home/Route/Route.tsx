import { FC } from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import { useRouteEditor } from 'services/routeEditor'
import DraggableList from 'components/DraggableList'
import Point from './Point'
import Placeholder from './Placeholder'
import RouteProps from './Route.props'

const Route: FC<RouteProps> = ({ className }) => {
  const { route, deleteAddress, updateRoute } = useRouteEditor()

  return (
    <>
      {!isEmpty(route) ? (
        <DraggableList
          className={cn(className, 'py-2')}
          list={route}
          renderItem={(address) => (
            <Point
              key={address.id}
              point={address}
              onDelete={() => deleteAddress(address.id)}
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
