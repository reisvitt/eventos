import api from './api'

export const getAllEvents = () => api.get("/event/list")

export const getEvent = (id) => api.get(`/event/${id}`)