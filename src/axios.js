import axios from "axios";

const api = axios.create({
  baseURL: "http://full.local/api/",
  //baseURL: "http://laravel.api/api/",
}); 

export default api;