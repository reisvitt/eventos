import Cookie from 'js-cookie'

const getToken = () => {
  return Cookie.get(process.env.TOKEN)
}

const setToken = token => {
  Cookie.set("event-token", token)
}

export { getToken, setToken }