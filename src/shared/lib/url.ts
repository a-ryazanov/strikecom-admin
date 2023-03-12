import isNil from '@tinkoff/utils/is/nil'

export const formatToSearchParams = <T extends object>(payload: T): URLSearchParams => {
  const result = new URLSearchParams()

  Object.entries(payload).forEach((entry) => {
    if (isNil(entry[1])) {
      return
    }

    result.set(...entry)
  })

  return result
}
