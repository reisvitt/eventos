import axios from "axios";
import { getToken } from "../../utils/auth";

const baseUrl = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: getToken(),
  },
});

export default api;
