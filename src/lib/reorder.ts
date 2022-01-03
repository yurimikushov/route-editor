const reorder = <T>(list: Array<T>, startIndex: number, endIndex: number) => {
  if (
    startIndex < 0 ||
    startIndex >= list.length ||
    endIndex < 0 ||
    endIndex >= list.length
  ) {
    throw new Error(
      `Both start and end indexes shouldn't be beyond the boundaries of the list`
    )
  }

  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default reorder
