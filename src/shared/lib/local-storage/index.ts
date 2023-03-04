export const getFromLocalStorage = <T = unknown>(key: string): T | null => {
  try {
    const data = window.localStorage.getItem(key)

    return data !== null ? JSON.parse(data) : null
  } catch (error) {
    return null
  }
}

export const setToLocalStorage = (key: string, payload: unknown): void => {
  console.log(payload)
  try {
    const stringifiedPayload = JSON.stringify(payload)

    window.localStorage.setItem(key, stringifiedPayload)
  } catch (error) {
    // noop
  }
}
