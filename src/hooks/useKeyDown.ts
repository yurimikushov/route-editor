import { DependencyList, useEffect } from 'react'

const useKeyDown = (
  code: string,
  cb: (e: KeyboardEvent) => void,
  deps: DependencyList
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== code) {
        return
      }

      cb(e)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, deps)
}

export default useKeyDown
