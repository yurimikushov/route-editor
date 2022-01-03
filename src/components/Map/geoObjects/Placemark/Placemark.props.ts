type PlacemarkProps = {
  point: {
    lat: number
    lon: number
  }
  preset?: 'islands#blueCircleIcon'
  balloonContent?: string
  draggable?: boolean
  onDragEnd?: (coords: { lat: number; lon: number }) => void
}

export default PlacemarkProps
