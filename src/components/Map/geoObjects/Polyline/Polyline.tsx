import { FC, useLayoutEffect, useRef } from 'react'
import ymaps from 'yandex-maps'
import mapObj from 'lodash/map'
import isNull from 'lodash/isNull'
import { useMap } from 'components/Map'
import PolylineProps from './Polyline.props'

const Polyline: FC<PolylineProps> = ({ points, strokeColor, strokeWidth }) => {
  const map = useMap()
  const polylineRef = useRef<ymaps.Polyline | null>(null)

  useLayoutEffect(() => {
    polylineRef.current = new window.ymaps.Polyline(
      mapObj(points, ({ lat, lon }) => [lat, lon])
    )

    map.geoObjects.add(polylineRef.current)

    return () => {
      if (isNull(polylineRef.current)) {
        return
      }

      map.geoObjects.remove(polylineRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (isNull(polylineRef.current)) {
      return
    }

    polylineRef.current.geometry?.setCoordinates(
      mapObj(points, ({ lat, lon }) => [lat, lon])
    )
  }, [points])

  useLayoutEffect(() => {
    if (isNull(polylineRef.current)) {
      return
    }

    polylineRef.current.options.set('strokeColor', strokeColor)
  }, [strokeColor])

  useLayoutEffect(() => {
    if (isNull(polylineRef.current)) {
      return
    }

    polylineRef.current.options.set('strokeWidth', strokeWidth)
  }, [strokeWidth])

  return null
}

export default Polyline
