type RouteEditor = {
  route: Array<Address>
  addPoint: (address: Address) => void
  deletePoint: (address: Address) => void
}

type Address = {
  name: string
  description: string
  point: {
    lat: number
    lon: number
  }
}

export type { RouteEditor, Address }
