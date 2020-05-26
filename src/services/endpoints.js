import api from './api'

export const getAllEvents = () => api.get("/event/list")

export const getEvent = (id) => api.get(`/event/${id}`)

export const saveEvent = (data) => api.post("/event", data)

export const saveActivity = (id, data) => api.post(`/event/${id}/activity`, data)