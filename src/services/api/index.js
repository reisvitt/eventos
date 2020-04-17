import axios from "axios";
import {getToken} from '../../utils/auth'

const baseUrl = "http://localhost:3333/api/";

const api = axios.create({
  baseURL: baseUrl,
  Headers: {
    Authorization: getToken()
  }
});

export default api;
