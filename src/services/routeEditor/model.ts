type RouteEditor = {
  route: Array<Address>
  addRoute: (address: Address) => void
  deleteRoute: (address: Address) => void
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
