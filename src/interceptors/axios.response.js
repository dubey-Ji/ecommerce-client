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
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = "/";
  }
  return response;
};

export const axiosErrorInterceptor = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    console.log("Error response data:", error.response.data);
  } else if (error.request) {
    // No response was received
    console.error("No response received", error.request);
  } else {
    // Something happened in setting up the request
    console.error("Error setting up request", error.message);
  }

  return Promise.reject(error); // Reject the promise to propagate the error
};
