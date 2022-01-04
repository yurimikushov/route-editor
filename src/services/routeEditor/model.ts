type RouteEditorState = {
  route: Array<Address>
}

type RouteEditor = {
  route: Array<Address>
  addAddress: (newAddress: NewAddress) => void
  changeAddress: (id: string, newPoint: Point) => void
  deleteAddress: (id: string) => void
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

export type { RouteEditorState, RouteEditor, NewAddress, Address, Point }
