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
          className={cn(className, 'overflow-y-scroll pl-1 pr-1 -mr-2')}
          draggableClassName='-mx-1 rounded-lg border-4 border-dashed border-gray-200'
          list={route}
          renderItem={(address, isDraggable) => (
            <Point
              key={address.id}
              point={address}
              isDraggable={isDraggable}
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
