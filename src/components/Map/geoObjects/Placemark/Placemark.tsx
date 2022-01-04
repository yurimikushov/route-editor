import { FC, useLayoutEffect, useRef } from 'react'
import ymaps from 'yandex-maps'
import isNull from 'lodash/isNull'
import isNil from 'lodash/isNil'
import { useMap } from 'components/Map'
import PlacemarkProps from './Placemark.props'

const Placemark: FC<PlacemarkProps> = ({
  point,
  preset,
  balloonContentHeader,
  balloonContentBody,
  draggable,
  onDragStart,
  onDragEnd,
}) => {
  const map = useMap()
  const placemarkRef = useRef<ymaps.Placemark | null>(null)

  useLayoutEffect(() => {
    placemarkRef.current = new window.ymaps.Placemark(
      [point.lat, point.lon],
      {}
    )

    map.geoObjects.add(placemarkRef.current)

    return () => {
      if (isNull(placemarkRef.current)) {
        return
      }

      map.geoObjects.remove(placemarkRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (isNull(placemarkRef.current)) {
      return
    }

    placemarkRef.current.geometry?.setCoordinates([point.lat, point.lon])
  }, [point.lat, point.lon])

  useLayoutEffect(() => {
    if (isNull(placemarkRef.current)) {
      return
    }

    placemarkRef.current.options.set('preset', preset)
  }, [preset])

  useLayoutEffect(() => {
    if (isNull(placemarkRef.current)) {
      return
    }

    placemarkRef.current.properties.set(
      'balloonContentHeader',
      balloonContentHeader
    )
    placemarkRef.current.properties.set(
      'balloonContentBody',
      balloonContentBody
    )
  }, [balloonContentHeader, balloonContentBody])

  useLayoutEffect(() => {
    if (isNull(placemarkRef.current)) {
      return
    }

    placemarkRef.current.options.set('draggable', String(draggable))
  }, [draggable])

  useLayoutEffect(() => {
    if (isNull(placemarkRef.current) || isNil(onDragStart)) {
      return
    }

    placemarkRef.current.events.add('dragstart', onDragStart)

    return () => {
      if (isNull(placemarkRef.current)) {
        return
      }

      placemarkRef.current.events.remove('dragstart', onDragStart)
    }
  }, [onDragStart])

  useLayoutEffect(() => {
    if (isNull(placemarkRef.current) || isNil(onDragEnd)) {
      return
    }

    const handleDragEnd = () => {
      const coords = placemarkRef.current?.geometry?.getCoordinates()

      if (isNil(coords)) {
        return
      }

      onDragEnd({
        lat: coords[0],
        lon: coords[1],
      })
    }

    placemarkRef.current.events.add('dragend', handleDragEnd)

    return () => {
      if (isNull(placemarkRef.current)) {
        return
      }

      placemarkRef.current.events.remove('dragend', handleDragEnd)
    }
  }, [onDragEnd])

  return null
}

export default Placemark
