import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import cn from 'classnames'
import map from 'lodash/map'
import isNil from 'lodash/isNil'
import reorder from 'lib/reorder'
import DraggableListProps from './DraggableList.props'

const DraggableList = <T,>({
  className,
  draggableClassName,
  list,
  renderItem,
  onUpdate,
}: DraggableListProps<T>) => {
  const handleDragEnd = (result: DropResult) => {
    if (isNil(result.destination)) {
      return
    }

    onUpdate(reorder(list, result.source.index, result.destination.index))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='draggable-list'>
        {(provided, snapshot) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(className, {
              [draggableClassName ?? '']: snapshot.isDraggingOver,
            })}
          >
            {map(list, (item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    tabIndex={-1}
                  >
                    {renderItem(item)}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableList
