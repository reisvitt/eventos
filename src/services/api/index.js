import axios from "axios";

const baseUrl = `http://localhost:3333/api/${process.env.VERSION}`;

const api = axios.create({
  baseURL: baseUrl
});

export default api;
