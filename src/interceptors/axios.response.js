import axios from "axios";

// axios.interceptors.response.use(
//   (response) => {
//     console.log(response, "interceptor response");
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export const axiosResponseInterceptor = (response) => {
  console.log(response, "interceptor response");
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }
  return response;
};
