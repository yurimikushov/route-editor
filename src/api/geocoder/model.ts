type GeocodingResult = {
  response: {
    GeoObjectCollection: {
      featureMember: Array<FeatureMember>
    }
  }
}

type FeatureMember = {
  GeoObject: {
    name: string
    description: string
    Point: {
      pos: string
    }
  }
}

export type { GeocodingResult, FeatureMember }
