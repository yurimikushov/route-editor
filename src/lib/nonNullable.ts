import isNil from 'lodash/isNil'

const nonNullable = <T>(value: T): NonNullable<T> => {
  if (isNil(value)) {
    throw new Error('Unexpected nullable value')
  }

  return value as NonNullable<T>
}

export default nonNullable
