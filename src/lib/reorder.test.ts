import reorder from './reorder'

it('should return same list when both start and end indexes are equal', () => {
  expect(reorder([1, 2, 3, 4, 5], 0, 0)).toEqual([1, 2, 3, 4, 5])
  expect(reorder([1, 2, 3, 4, 5], 1, 1)).toEqual([1, 2, 3, 4, 5])
  expect(reorder([1, 2, 3, 4, 5], 3, 3)).toEqual([1, 2, 3, 4, 5])
})

it(`should return reordered list when both start and end indexes aren't equal`, () => {
  expect(reorder([1, 2, 3, 4, 5], 0, 1)).toEqual([2, 1, 3, 4, 5])
  expect(reorder([1, 2, 3, 4, 5], 1, 4)).toEqual([1, 3, 4, 5, 2])
  expect(reorder([1, 2, 3, 4, 5], 2, 4)).toEqual([1, 2, 4, 5, 3])
})

it(`should throw error when start or end index is beyond the boundaries of the list`, () => {
  const expectedError = new Error(
    `Both start and end indexes shouldn't be beyond the boundaries of the list`
  )

  expect(() => reorder([1, 2, 3, 4, 5], 6, 1)).toThrow(expectedError)
  expect(() => reorder([1, 2, 3, 4, 5], -1, 1)).toThrow(expectedError)
  expect(() => reorder([1, 2, 3, 4, 5], 6, -1)).toThrow(expectedError)
})
