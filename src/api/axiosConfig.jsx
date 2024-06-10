import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from './urls';

const controller = new AbortController();

const api = axios.create({
    baseURL: baseUrl,
    timeout: 100000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    signal: controller.signal,
    validateStatus: function (status) {
        return status >= 200 && status < 300;
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
