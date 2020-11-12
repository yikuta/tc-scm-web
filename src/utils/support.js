export function setCookie(key, value) {
  return localStorage.setItem(key, value)
}

export function getCookie(key) {
  return localStorage.getItem(key)
}

export function removeCookie(key) {
  localStorage.removeItem(key)
}
