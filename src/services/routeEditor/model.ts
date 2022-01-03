type RouteEditor = {
  route: Array<Address>
  addPoint: (address: Address) => void
  changePoint: (address: Address, newPoint: Point) => void
  deletePoint: (address: Address) => void
}

type Address = {
  name: string
  description: string
  point: Point
}

type Point = {
  lat: number
  lon: number
}

export type { RouteEditor, Address, Point }
