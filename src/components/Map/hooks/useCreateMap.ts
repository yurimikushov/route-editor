import { RefObject, useEffect, useState } from 'react'
import { IMapState, Map } from 'yandex-maps'
import isNull from 'lodash/isNull'
import fetchScript from 'lib/fetchScript'

const MAP_URL = `${process.env.REACT_APP_MAP_API}/?apikey=${process.env.REACT_APP_MAP_API_KEY}`

type Local = 'ru_RU' | 'en_US' | 'en_RU' | 'ru_UA' | 'uk_UA' | 'tr_TR'

const useCreateMap = (
  ref: RefObject<HTMLDivElement>,
  state: IMapState,
  local: Local = 'ru_RU'
) => {
  const [isCreating, setIsCreating] = useState(false)
  const [map, setMap] = useState<Map | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    setIsCreating(true)

    const hash = Date.now().toString(32)
    const loadCallbackName = `load${hash}`
    const errorCallbackName = `error${hash}`

    // @ts-expect-error bad typing
    window[loadCallbackName] = () => {
      if (isNull(ref.current)) {
        throw new Error('[Map] Map container should be created')
      }

      setIsCreating(false)
      setMap(
        new window.ymaps.Map(ref.current, {
          controls: [],
          ...state,
        })
      )

      // @ts-expect-error bad typing
      delete window[loadCallbackName]
      // @ts-expect-error bad typing
      delete window[errorCallbackName]
    }

    // @ts-expect-error bad typing
    window[errorCallbackName] = (error) => {
      setIsCreating(false)
      setError(error)

      // @ts-expect-error bad typing
      delete window[loadCallbackName]
      // @ts-expect-error bad typing
      delete window[errorCallbackName]
    }

    fetchScript(
      `${MAP_URL}&lang=${local}&onload=${loadCallbackName}&onerror=${errorCallbackName}`
    ).catch((error: Error) => {
      setIsCreating(false)
      setError(error)
    })
  }, [])

  return {
    isCreating,
    map,
    error,
  }
}

export default useCreateMap
