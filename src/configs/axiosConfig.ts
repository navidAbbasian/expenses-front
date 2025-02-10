import axios, { CustomAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const controller = new AbortController();

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const baseUrlMap: Record<string, string> = {
  default: baseUrl,
};

const api = axios.create({
  baseURL: baseUrlMap["default"],
  timeout: 100000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  signal: controller.signal,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

api.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.baseUrlKey && baseUrlMap[config.baseUrlKey]) {
      config.baseURL = baseUrlMap[config.baseUrlKey];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default api;
