export const formatToSearchParams = <T extends object>(payload: T): URLSearchParams => {
  const result = new URLSearchParams()

  Object.entries(payload).forEach((entry) => {
    result.set(...entry)
  })

  return result
}
