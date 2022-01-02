import { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import { useRouteEditor } from 'services/routeEditor'
import { useSuggestions } from 'services/suggestions'
import Suggestions from './Suggestions'
import SearchFormProps from './SearchForm.props'
import TextInput from 'components/TextInput'

const SearchForm: FC<SearchFormProps> = ({ className }) => {
  const [address, setAddress] = useState('')
  const { addRoute: handleAddPoint } = useRouteEditor()
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

  return (
    <form className={cn(className, 'relative w-80')}>
      <TextInput
        className='w-full'
        type='search'
        value={address}
        placeholder='Новая точка маршрута'
        hasClear
        onChange={handleAddressChange}
      />
      {!isEmpty(suggestions) && (
        <Suggestions
          className='absolute top-16 left-0'
          suggestions={suggestions}
          onSelect={handleAddPoint}
        />
      )}
    </form>
  )
}

export default SearchForm
