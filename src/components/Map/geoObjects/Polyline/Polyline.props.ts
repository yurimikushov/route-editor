type PolylineProps = {
  points: Array<{
    lat: number
    lon: number
  }>
  strokeColor?: string
  strokeWidth?: number
  autoFocusOnLastPoint?: boolean
}

export default PolylineProps
