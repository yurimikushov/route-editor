import { FC } from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import TextInput from 'components/TextInput'
import useSearchForm from './hooks/useSearchForm'
import Suggestions from './Suggestions'
import SearchFormProps from './SearchForm.props'

const SearchForm: FC<SearchFormProps> = ({ className }) => {
  const {
    searchInputRef,
    address,
    suggestions,
    shouldDisplaySuggestions,
    handleAddressChange,
    handleAddressFocus,
    handleAddressBlur,
    handleAddAddress,
  } = useSearchForm()

  return (
    <form
      className={cn(className, 'relative')}
      onSubmit={(e) => e.preventDefault()}
    >
      <TextInput
        ref={searchInputRef}
        className='w-full'
        type='search'
        value={address}
        placeholder='Новая точка маршрута'
        autoFocus
        hasClear
        onChange={handleAddressChange}
        onFocus={handleAddressFocus}
        onBlur={handleAddressBlur}
      />
      {shouldDisplaySuggestions && !isEmpty(suggestions) && (
        <Suggestions
          className='absolute top-12 left-0'
          suggestions={suggestions}
          onChoose={handleAddAddress}
        />
      )}
    </form>
  )
}

export default SearchForm
