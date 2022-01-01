import { renderHook, act } from '@testing-library/react-hooks'
import fetchScript from 'lib/fetchScript'
import sleep from 'lib/sleep'
import useCreateMap from './useCreateMap'

jest.mock('lib/fetchScript')

const runMockFetchScript = (
  cb: (() => void) | ((url: string) => Promise<void>)
) => {
  // @ts-expect-error bad typing
  fetchScript.mockImplementation(cb)
}

const FETCHING_DURATION = 1

const renderUseCreateMap = () => {
  return renderHook(({ ref, state }) => useCreateMap(ref, state), {
    initialProps: {
      ref: {
        current: document.createElement('div'),
      },
      state: {
        center: [0, 0],
        zoom: 1,
      },
    },
  })
}

it('should start map creating when hook is called', async () => {
  runMockFetchScript(async () => {
    await sleep(FETCHING_DURATION)
  })

  const { result } = renderUseCreateMap()

  expect(result.current.isCreating).toBeTruthy()
  expect(result.current.map).toBeNull()
  expect(result.current.error).toBeNull()
})

it('should create map when map is loaded', async () => {
  const mockYmaps = {
    Map: class Map {},
  } as const

  runMockFetchScript(async (url: string) => {
    await sleep(FETCHING_DURATION)

    // @ts-expect-error bad typing
    window['ymaps'] = mockYmaps
    // @ts-expect-error bad typing
    window[new URL(url).searchParams.get('onload')]()
  })

  const { result } = renderUseCreateMap()

  await act(async () => {
    await sleep(FETCHING_DURATION + 1)
  })

  expect(result.current.isCreating).toBeFalsy()
  expect(result.current.map).toBeInstanceOf(mockYmaps.Map)
  expect(result.current.error).toBeNull()
})

it('should return error when map initialization is failed', async () => {
  const error = new Error('Map initialization is failed')

  runMockFetchScript(async (url: string) => {
    await sleep(FETCHING_DURATION)

    // @ts-expect-error bad typing
    window[new URL(url).searchParams.get('onerror')](error)
  })

  const { result } = renderUseCreateMap()

  await act(async () => {
    await sleep(FETCHING_DURATION + 1)
  })

  expect(result.current.isCreating).toBeFalsy()
  expect(result.current.map).toBeNull()
  expect(result.current.error).toEqual(error)
})

it('should return error when map script loading is failed', async () => {
  const error = new Error('Script loading is failed')

  runMockFetchScript(async () => {
    return Promise.reject(error)
  })

  const { result } = renderUseCreateMap()

  await act(async () => Promise.resolve())

  expect(result.current.isCreating).toBeFalsy()
  expect(result.current.map).toBeNull()
  expect(result.current.error).toEqual(error)
})
