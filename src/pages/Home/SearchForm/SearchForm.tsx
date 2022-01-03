import { FC, FormEvent, useCallback, useState } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import { Address, useRouteEditor } from 'services/routeEditor'
import { useSuggestions } from 'services/suggestions'
import Suggestions from './Suggestions'
import SearchFormProps from './SearchForm.props'
import TextInput from 'components/TextInput'

const SearchForm: FC<SearchFormProps> = ({ className }) => {
  const [address, setAddress] = useState('')
  const [shouldDisplaySuggestions, setShouldDisplaySuggestions] =
    useState(false)
  const { addPoint } = useRouteEditor()
  const {
    suggestions,
    load: loadSuggestions,
    clear: clearSuggestions,
  } = useSuggestions()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

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

  return (
    <form className={cn(className, 'relative w-80')} onSubmit={handleSubmit}>
      <TextInput
        className='w-full'
        type='search'
        value={address}
        placeholder='Новая точка маршрута'
        hasClear
        onChange={handleAddressChange}
        onFocus={handleAddressFocus}
        onBlur={handleAddressBlur}
      />
      {shouldDisplaySuggestions && !isEmpty(suggestions) && (
        <Suggestions
          className='absolute top-12 left-0'
          suggestions={suggestions}
          onSelect={handleAddPoint}
        />
      )}
    </form>
  )
}

export default SearchForm
