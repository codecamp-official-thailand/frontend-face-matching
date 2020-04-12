import axios from "axios";
import LocalStorageService from "../services/LocalStorageService";

const localStorageService = LocalStorageService.getService();

axios.defaults.baseURL = "http://system2.p-robotics.net:3000";

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("/oauth/token")) return config;
    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url.includes("/oauth/token")
    ) {
      localStorageService.clearToken();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("/oauth/token", {
          refresh_token: localStorageService.getRefreshToken(),
          grant_type: "refresh_token",
        })
        .then((res) => {
          if (res.status === 201) {
            localStorageService.setToken(res.data);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axios;
