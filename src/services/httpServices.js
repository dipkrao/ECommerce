import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5055/api",
  timeout: 50000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// On 5xx or network errors for setting/language endpoints, return {} so app uses fallbacks
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config || {};
    const path = (config.baseURL || "") + (config.url || "");
    const isSettingEndpoint =
      /\/setting\//.test(path) ||
      /\/language\/show/.test(path);
    const status = error.response?.status;
    const isServerError = status >= 500 || status === 408;
    const isNetworkError = !error.response;

    if (isSettingEndpoint && (isServerError || isNetworkError)) {
      return Promise.resolve({ data: {}, status: 200 });
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  // console.log("token", token);
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => instance.get(url, body).then(responseBody),
  post: (url, body, headers) =>
    instance.post(url, body, headers).then(responseBody),
  put: (url, body) => instance.put(url, body).then(responseBody),
};

export default requests;
