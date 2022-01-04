import { FC, useLayoutEffect, useRef } from 'react'
import ymaps from 'yandex-maps'
import mapObj from 'lodash/map'
import isNull from 'lodash/isNull'
import isNil from 'lodash/isNil'
import last from 'lodash/last'
import { useMap } from 'components/Map'
import PolylineProps from './Polyline.props'

const Polyline: FC<PolylineProps> = ({
  points,
  strokeColor,
  strokeWidth,
  autoFocusOnLastPoint = false,
}) => {
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

  useLayoutEffect(() => {
    if (!autoFocusOnLastPoint) {
      return
    }

    const lastPoint = last(points)

    if (isNil(lastPoint)) {
      return
    }

    const { lat, lon } = lastPoint

    map.setCenter([lat, lon], map.getZoom(), {
      duration: 300,
    })
  }, [autoFocusOnLastPoint, points])

  return null
}

export default Polyline
