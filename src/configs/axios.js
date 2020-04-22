import axios from "axios";
import LocalStorageService from "../services/LocalStorageService";

const localStorageService = LocalStorageService.getService();

axios.defaults.baseURL = "http://localhost:8000/";

axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("/login")) return config;
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
    if (error.response.status === 401) {
      localStorageService.clearToken();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axios;
