import { renderHook, act } from '@testing-library/react-hooks'
import useSuggestions from './useSuggestions'

const mockSuggestions = [
  {
    name: 'Balalyaka',
    description: 'Some description',
    point: {
      lat: 0,
      lon: 0,
    },
  },
  {
    name: 'Vodka',
    description: 'Some description',
    point: {
      lat: 1,
      lon: 1,
    },
  },
  {
    name: 'Pelmeny',
    description: 'Some description',
    point: {
      lat: 3,
      lon: 3,
    },
  },
]

const mockHandleChoose = jest.fn()

const renderUseSuggestions = () => {
  return renderHook(
    ({ suggestions, onChoose }) => useSuggestions(suggestions, onChoose),
    {
      initialProps: {
        suggestions: mockSuggestions,
        onChoose: mockHandleChoose,
      },
    }
  )
}

const emitArrowUp = () => {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      code: 'ArrowUp',
    })
  )
}

const emitArrowDown = () => {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      code: 'ArrowDown',
    })
  )
}

const emitEnter = () => {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      code: 'Enter',
    })
  )
}

const emitSpace = () => {
  window.dispatchEvent(
    new KeyboardEvent('keydown', {
      code: 'Space',
    })
  )
}

it('should highlight last element when nothing is highlighted', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowUp()
  })

  expect(result.current.highlightedSuggestion).toBe(mockSuggestions.length - 1)
})

it('should highlight element that is located before current highlighted element', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowUp()
  })

  act(() => {
    emitArrowUp()
  })

  expect(result.current.highlightedSuggestion).toBe(mockSuggestions.length - 2)
})

it('should highlighted  when current highlighted element is first element', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowDown()
  })

  act(() => {
    emitArrowUp()
  })

  expect(result.current.highlightedSuggestion).toBe(-1)
})

it('should highlight first element when nothing is highlighted', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowDown()
  })

  expect(result.current.highlightedSuggestion).toBe(0)
})

it('should highlight element that is behind current highlighted element', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowDown()
  })

  act(() => {
    emitArrowDown()
  })

  expect(result.current.highlightedSuggestion).toBe(1)
})

it('should highlight first element when current highlighted element is last element', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowUp()
  })

  act(() => {
    emitArrowDown()
  })

  expect(result.current.highlightedSuggestion).toBe(0)
})

it('[by Enter] should call onChoose when highlighted element is exists', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowDown()
  })

  act(() => {
    emitEnter()
  })

  expect(result.current.highlightedSuggestion).toBe(0)
  expect(mockHandleChoose).toHaveBeenCalledTimes(1)
})

it(`[by Enter] shouldn't call onChoose when highlighted element isn't exists`, async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitEnter()
  })

  expect(result.current.highlightedSuggestion).toBe(-1)
  expect(mockHandleChoose).toHaveBeenCalledTimes(0)
})

it('[by Space] should call onChoose element when highlighted element is exists', async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitArrowDown()
  })

  act(() => {
    emitSpace()
  })

  expect(result.current.highlightedSuggestion).toBe(0)
  expect(mockHandleChoose).toHaveBeenCalledTimes(1)
})

it(`[by Space] shouldn't call onChoose when highlighted element isn't exists`, async () => {
  const { result } = renderUseSuggestions()

  act(() => {
    emitSpace()
  })

  expect(result.current.highlightedSuggestion).toBe(-1)
  expect(mockHandleChoose).toHaveBeenCalledTimes(0)
})
