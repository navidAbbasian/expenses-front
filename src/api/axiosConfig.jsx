import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from './urls';

let isRefreshing = false;
let refreshSubscribers = [];

// Function to subscribe to token refresh
function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

// Function to notify subscribers about token refresh
function onTokenRefreshed(token) {
    refreshSubscribers.forEach((cb) => cb(token));
}

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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If response status is 401 Unauthorized and request hasn't been retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If token refresh is already in progress, add request to subscribers
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            // Refresh token using the refresh token
            try {
                const refreshToken = Cookies.get('refresh_token');
                const response = await axios.post(`${baseUrl}refresh`, {
                    refreshToken,
                });

                if (response?.status === 200) {
                    const newAccessToken =
                        response?.data?.data?.token?.access_token;
                    const newRefreshToken =
                        response?.data?.data?.token?.refresh_token;
                    Cookies.set('access_token', newAccessToken, {
                        secure: true,
                    });
                    Cookies.set('refresh_token', newRefreshToken, {
                        secure: true,
                    });
                    api.defaults.headers.common[
                        'Authorization'
                    ] = `${newAccessToken}`;
                    originalRequest.headers.Authorization = `${newAccessToken}`;
                    onTokenRefreshed(newAccessToken);
                    return api(originalRequest);
                } else {
                    // Handle token refresh failure
                    console.error('Token refresh failed:', response);
                    // Perform logout and redirect to the login page
                    // logoutUser(); // Custom function to handle user logout
                    // redirectToLoginPage(); // Custom function to redirect to the login page
                    return Promise.reject(error); // Reject the promise to propagate the error
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
