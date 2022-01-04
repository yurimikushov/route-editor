type PlacemarkProps = {
  point: {
    lat: number
    lon: number
  }
  preset?: 'islands#blueCircleIcon'
  balloonContentHeader?: string
  balloonContentBody?: string
  draggable?: boolean
  onDragStart?: () => void
  onDragEnd?: (point: { lat: number; lon: number }) => void
}

export default PlacemarkProps
