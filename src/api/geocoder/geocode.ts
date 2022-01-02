import axios from 'axios'
import trim from 'lodash/trim'
import { BASE_URL } from './constants'
import { GeocodingResult } from './model'
import convertFeatureMember from './utils/convertFeatureMember'

const geocode = async (address: string) => {
  const { data } = await axios.get<GeocodingResult>(
    `${BASE_URL}/?format=json&apikey=${
      process.env.REACT_APP_MAP_API_KEY
    }&geocode=${trim(address)}`
  )

  return convertFeatureMember(data.response.GeoObjectCollection.featureMember)
}

export default geocode
