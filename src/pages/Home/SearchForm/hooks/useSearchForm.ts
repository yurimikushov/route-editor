import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import { Address, useRouteEditor } from 'services/routeEditor'
import { useSuggestions } from 'services/suggestions'

const useSearchForm = () => {
  const [address, setAddress] = useState('')
  const [shouldDisplaySuggestions, setShouldDisplaySuggestions] =
    useState(false)
  const { addPoint } = useRouteEditor()
  const {
    suggestions,
    load: loadSuggestions,
    clear: clearSuggestions,
  } = useSuggestions()

  const debouncedLoadSuggestions = useCallback(
    debounce(loadSuggestions, 100),
    []
  )

  const handleAddressChange = (address: string) => {
    setAddress(address)

    if (isEmpty(address)) {
      clearSuggestions()
    } else {
      debouncedLoadSuggestions(address)
    }
  }

  const handleAddressFocus = () => {
    setShouldDisplaySuggestions(true)
  }

  const handleAddressBlur = () => {
    setShouldDisplaySuggestions(false)
  }

  const handleAddPoint = (address: Address) => {
    addPoint(address)
    clearSuggestions()
    setAddress('')
  }

  return {
    address,
    suggestions,
    shouldDisplaySuggestions,
    handleAddressChange,
    handleAddressFocus,
    handleAddressBlur,
    handleAddPoint,
  }
}

export default useSearchForm
