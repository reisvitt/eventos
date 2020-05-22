import Cookie from 'js-cookie'

const getToken = () => {
  return Cookie.get('event-token')
}

const setToken = token => {
  Cookie.set("event-token", token)
}

const removeCookie = () => {
  Cookie.remove('event-token')
}

export { getToken, setToken, removeCookie }