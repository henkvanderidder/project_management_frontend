import axios from "axios";

const api = axios.create({
  baseURL: "http://full.local/api/",
}); 

export default api;