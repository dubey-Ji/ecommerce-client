import axios from "axios";
// import { axiosRequestInterceptor } from "./axios.request";
import { axiosResponseInterceptor } from "./axios.response";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// axiosInstance.interceptors.request.use(axiosRequestInterceptor);
axiosInstance.interceptors.response.use(axiosResponseInterceptor);

export default axiosInstance;
