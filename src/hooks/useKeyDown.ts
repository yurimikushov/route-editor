import { DependencyList, useEffect } from 'react'

const useKeyDown = (code: string, cb: () => void, deps: DependencyList) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== code) {
        return
      }

      cb()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, deps)
}

export default useKeyDown
