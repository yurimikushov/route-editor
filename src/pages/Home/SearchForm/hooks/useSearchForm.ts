import { useCallback, useRef, useState } from 'react'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import defer from 'lodash/defer'
import { NewAddress, useRouteEditor } from 'services/routeEditor'
import { useSuggestions } from 'services/suggestions'

const useSearchForm = () => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [address, setAddress] = useState('')
  const [shouldDisplaySuggestions, setShouldDisplaySuggestions] =
    useState(false)
  const { addAddress } = useRouteEditor()
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

  const handleAddAddress = (newAddress: NewAddress) => {
    addAddress(newAddress)
    clearSuggestions()
    setAddress('')
    defer(() => searchInputRef.current?.focus())
  }

  return {
    searchInputRef,
    address,
    suggestions,
    shouldDisplaySuggestions,
    handleAddressChange,
    handleAddressFocus,
    handleAddressBlur,
    handleAddAddress,
  }
}

export default useSearchForm
