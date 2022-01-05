import { ReactNode } from 'react'

type DraggableListProps<T> = {
  className?: string
  draggableClassName?: string
  list: Array<Item<T>>
  renderItem: (item: Item<T>, isDraggable: boolean) => ReactNode
  onUpdate: (list: Array<Item<T>>) => void
}

type Item<T> = T & { id: string }

export default DraggableListProps
