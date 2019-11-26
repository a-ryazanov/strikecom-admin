export function setValueToLocalStorage(key: string, value: string): void {
  window.localStorage.setItem(key, value);
}

export function getValueFromLocalStorage(key: string): string | null {
  return window.localStorage.getItem(key);
}
