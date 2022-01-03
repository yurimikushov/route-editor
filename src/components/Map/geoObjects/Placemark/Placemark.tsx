import { FC, useLayoutEffect, useRef } from 'react'
import ymaps from 'yandex-maps'
import isNull from 'lodash/isNull'
import isNil from 'lodash/isNil'
import { useMap } from 'components/Map'
import PlacemarkProps from './Placemark.props'

const Placemark: FC<PlacemarkProps> = ({
  point,
  preset,
  balloonContent,
  draggable,
  onDragEnd,
}) => {
  const map = useMap()
  const circleRef = useRef<ymaps.Placemark | null>(null)

  useLayoutEffect(() => {
    circleRef.current = new window.ymaps.Placemark([point.lat, point.lon], {})

    map.geoObjects.add(circleRef.current)

    return () => {
      if (isNull(circleRef.current)) {
        return
      }

      map.geoObjects.remove(circleRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (isNull(circleRef.current)) {
      return
    }

    circleRef.current.geometry?.setCoordinates([point.lat, point.lon])
  }, [point.lat, point.lon])

  useLayoutEffect(() => {
    if (isNull(circleRef.current)) {
      return
    }

    circleRef.current.options.set('preset', preset)
  }, [preset])

  useLayoutEffect(() => {
    if (isNull(circleRef.current)) {
      return
    }

    circleRef.current.properties.set('balloonContent', balloonContent)
  }, [balloonContent])

  useLayoutEffect(() => {
    if (isNull(circleRef.current)) {
      return
    }

    circleRef.current.options.set('draggable', String(draggable))
  }, [draggable])

  useLayoutEffect(() => {
    if (isNull(circleRef.current) || isNil(onDragEnd)) {
      return
    }

    const handleDragEnd = () => {
      const coords = circleRef.current?.geometry?.getCoordinates()

      if (isNil(coords)) {
        return
      }

      onDragEnd({
        lat: coords[0],
        lon: coords[1],
      })
    }

    circleRef.current.events.add('dragend', handleDragEnd)

    return () => {
      if (isNull(circleRef.current)) {
        return
      }

      circleRef.current.events.remove('dragend', handleDragEnd)
    }
  }, [onDragEnd])

  return null
}

export default Placemark
