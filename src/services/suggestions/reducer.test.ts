import { loadBegin, loadSuccess, loadFail, clear } from './actions'
import suggestionsReducer from './reducer'

it('should enable loading flag and reset error', () => {
  expect(
    suggestionsReducer(
      {
        isLoading: false,
        suggestions: [
          {
            name: 'Balalayka',
            description: 'Some description',
            point: {
              lat: 0,
              lon: 0,
            },
          },
        ],
        error: new Error(),
      },
      loadBegin()
    )
  ).toEqual({
    isLoading: true,
    suggestions: [
      {
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
    ],
    error: null,
  })
})

it('should set suggestions and disable loading flag', () => {
  expect(
    suggestionsReducer(
      { isLoading: true, suggestions: [], error: null },
      loadSuccess([
        {
          name: 'Balalayka',
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
            lat: 0,
            lon: 0,
          },
        },
      ])
    )
  ).toEqual({
    isLoading: false,
    suggestions: [
      {
        name: 'Balalayka',
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
          lat: 0,
          lon: 0,
        },
      },
    ],
    error: null,
  })
})

it('should set error and disable loading flag', () => {
  expect(
    suggestionsReducer(
      { isLoading: false, suggestions: [], error: new Error() },
      loadFail(new Error('Loading error'))
    )
  ).toEqual({
    isLoading: false,
    suggestions: [],
    error: new Error('Loading error'),
  })
})

it('should clear suggestions', () => {
  expect(
    suggestionsReducer(
      {
        isLoading: false,
        suggestions: [
          {
            name: 'Balalayka',
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
              lat: 0,
              lon: 0,
            },
          },
        ],
        error: null,
      },
      clear()
    )
  ).toEqual({ isLoading: false, suggestions: [], error: null })
})
