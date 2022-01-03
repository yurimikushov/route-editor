import axios from 'axios'
import trim from 'lodash/trim'
import { BASE_URL } from './constants'
import { GeocodingResult } from './model'
import convertFeatureMember from './utils/convertFeatureMember'

const GEOCODE_URL = `${BASE_URL}/?format=json&apikey=${process.env.REACT_APP_MAP_API_KEY}&geocode=`

const geocodeByAddress = async (address: string) => {
  const { data } = await axios.get<GeocodingResult>(
    `${GEOCODE_URL}${trim(address)}`
  )

  return convertFeatureMember(data.response.GeoObjectCollection.featureMember)
}

const geocodeByCoords = async (point: { lat: number; lon: number }) => {
  const { data } = await axios.get<GeocodingResult>(
    `${GEOCODE_URL}${point.lon},${point.lat}&results=1`
  )

  return convertFeatureMember(
    data.response.GeoObjectCollection.featureMember
  )[0]
}

export { geocodeByAddress, geocodeByCoords }
