import axios from "axios";
// import { axiosRequestInterceptor } from "./axios.request";
import {
  axiosResponseInterceptor,
  axiosErrorInterceptor,
} from "./axios.response";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

// axiosInstance.interceptors.request.use(axiosRequestInterceptor);
axiosInstance.interceptors.response.use(
  axiosResponseInterceptor,
  axiosErrorInterceptor
);

export default axiosInstance;
