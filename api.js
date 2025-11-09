import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true // important: send/receive cookies
});

export default api;
