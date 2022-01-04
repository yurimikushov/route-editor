import { EffectCallback, useEffect } from 'react'

const useEffectWhen = (effect: EffectCallback, predicate: boolean) => {
  useEffect(() => {
    if (!predicate) {
      return
    }

    return effect()
  }, [predicate])
}

export default useEffectWhen
