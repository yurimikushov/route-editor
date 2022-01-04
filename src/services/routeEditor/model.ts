type RouteEditor = {
  route: Array<Address>
  addPoint: (newAddress: NewAddress) => void
  changePoint: (id: string, newPoint: Point) => void
  deletePoint: (id: string) => void
  updateRoute: (route: Array<Address>) => void
}

type NewAddress = Omit<Address, 'id'>

type Address = {
  id: string
  name: string
  description: string
  point: Point
}

type Point = {
  lat: number
  lon: number
}

export type { RouteEditor, NewAddress, Address, Point }
