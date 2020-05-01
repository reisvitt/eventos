import Cookie from 'js-cookie'

const getToken = () => {
  return Cookie.get('event-token')
}

const setToken = token => {
  Cookie.set("event-token", token)
}

export { getToken, setToken }