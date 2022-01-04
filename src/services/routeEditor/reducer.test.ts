import {
  addAddress,
  changeAddressBegin,
  changeAddressSuccess,
  changeAddressFail,
  deleteAddress,
  updateRoute,
} from './actions'
import { RouteEditorState } from './model'
import routeEditorReducer from './reducer'

it('should add new addresses', () => {
  let state: RouteEditorState = {
    route: [],
  }

  state = routeEditorReducer(
    state,
    addAddress({
      name: 'Balalayka',
      description: 'Some description',
      point: {
        lat: 0,
        lon: 0,
      },
    })
  )

  state = routeEditorReducer(
    state,
    addAddress({
      name: 'Vodka',
      description: 'Some description',
      point: {
        lat: 1,
        lon: 1,
      },
    })
  )

  expect(state).toEqual({
    route: [
      {
        id: expect.any(String),
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: expect.any(String),
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 1,
          lon: 1,
        },
      },
    ],
  })
})

it('should start changing when address is exists', () => {
  const state: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 1,
          lon: 1,
        },
      },
    ],
  }

  const expectedState: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Адрес обновляется...',
        description: '',
        point: {
          lat: 2,
          lon: 2,
        },
      },
    ],
  }

  expect(
    routeEditorReducer(
      state,
      changeAddressBegin('2', {
        lat: 2,
        lon: 2,
      })
    )
  ).toEqual(expectedState)
})

it('should complete address changing when it is completed successfully', () => {
  const state: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Адрес обновляется...',
        description: '',
        point: {
          lat: 2,
          lon: 2,
        },
      },
    ],
  }

  const expectedState: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 2,
          lon: 2,
        },
      },
    ],
  }

  expect(
    routeEditorReducer(
      state,
      changeAddressSuccess('2', {
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 2,
          lon: 2,
        },
      })
    )
  ).toEqual(expectedState)
})

it('should complete address changing when it is completed with failure', () => {
  const state: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Адрес обновляется...',
        description: '',
        point: {
          lat: 2,
          lon: 2,
        },
      },
    ],
  }

  const expectedState: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Не удалось обновить адрес',
        description: '',
        point: {
          lat: 2,
          lon: 2,
        },
      },
    ],
  }

  expect(routeEditorReducer(state, changeAddressFail('2'))).toEqual(
    expectedState
  )
})

it('should delete address when address is exists', () => {
  const state: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Vodka.',
        description: 'Some description',
        point: {
          lat: 1,
          lon: 1,
        },
      },
    ],
  }

  const expectedState: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
    ],
  }

  expect(routeEditorReducer(state, deleteAddress('2'))).toEqual(expectedState)
})

it(`should return passed state when address isn't exists`, () => {
  const state: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
    ],
  }

  const expectedState: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
    ],
  }

  expect(
    routeEditorReducer(
      state,
      changeAddressBegin('2', {
        lat: 2,
        lon: 2,
      })
    )
  ).toEqual(expectedState)
  expect(
    routeEditorReducer(
      state,
      changeAddressSuccess('2', {
        name: 'Vodka',
        description: 'Some description',
        point: {
          lat: 2,
          lon: 2,
        },
      })
    )
  ).toEqual(expectedState)
  expect(routeEditorReducer(state, changeAddressFail('2'))).toEqual(
    expectedState
  )
  expect(routeEditorReducer(state, deleteAddress('2'))).toEqual(expectedState)
})

it('should update route', () => {
  const state: RouteEditorState = {
    route: [
      {
        id: '1',
        name: 'Balalayka',
        description: 'Some description',
        point: {
          lat: 0,
          lon: 0,
        },
      },
      {
        id: '2',
        name: 'Vodka.',
        description: 'Some description',
        point: {
          lat: 1,
          lon: 1,
        },
      },
    ],
  }

  const expectedState: RouteEditorState = {
    route: [
      {
        id: '3',
        name: 'Pelmeny',
        description: 'Some description',
        point: {
          lat: 3,
          lon: 3,
        },
      },
    ],
  }

  expect(
    routeEditorReducer(
      state,
      updateRoute([
        {
          id: '3',
          name: 'Pelmeny',
          description: 'Some description',
          point: {
            lat: 3,
            lon: 3,
          },
        },
      ])
    )
  ).toEqual(expectedState)
})
