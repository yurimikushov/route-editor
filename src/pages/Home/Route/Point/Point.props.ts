import { Address } from 'services/routeEditor'

type PointProps = {
  className?: string
  isDraggable?: boolean
  point: Address
  onDelete: () => void
}

export default PointProps
