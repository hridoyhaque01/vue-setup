import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_AUTH_TOKEN;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response.status;
    if (status == 401 || status == 403) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
