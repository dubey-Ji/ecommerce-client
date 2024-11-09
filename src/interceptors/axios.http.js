import axios from "axios";
// import { axiosRequestInterceptor } from "./axios.request";
import { axiosResponseInterceptor } from "./axios.response";

const axiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

// axiosInstance.interceptors.request.use(axiosRequestInterceptor);
axiosInstance.interceptors.response.use(axiosResponseInterceptor);

export default axiosInstance;
