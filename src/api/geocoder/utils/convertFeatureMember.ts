import map from 'lodash/map'
import split from 'lodash/split'
import { FeatureMember } from '../model'

const convertFeatureMember = (featureMember: Array<FeatureMember>) => {
  return map(featureMember, ({ GeoObject }) => {
    const [lon, lat] = map(split(GeoObject.Point.pos, ' '), Number)

    return {
      name: GeoObject.name,
      description: GeoObject.description,
      point: {
        lat,
        lon,
      },
    }
  })
}

export default convertFeatureMember
