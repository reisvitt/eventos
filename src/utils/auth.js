import Cookie from 'js-cookie'

const getToken = () => {
  console.log("TOKEN", Cookie.get("event-token"))
  return Cookie.get(process.env.TOKEN)
}

const setToken = token => {
  Cookie.set("event-token", token)
}

export { getToken, setToken }