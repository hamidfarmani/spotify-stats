import axios from "axios";

const getData = (res) => res.data;

export const AxiosHttpClient = (instance) => ({
  instance,
  get: (endpoint, options) => instance.get(endpoint, options).then(getData),

  rawGet: (endpoint, options) => instance.get(endpoint, options),

  delete: (endpoint, options) =>
    instance.delete(endpoint, options).then(getData),

  rawPost: (endpoint, data, options) => instance.post(endpoint, data, options),

  post: (endpoint, data, options) =>
    instance.post(endpoint, data, options).then(getData),

  put: (endpoint, data, options) =>
    instance.put(endpoint, data, options).then(getData),

  patch: (endpoint, data, options) =>
    instance.patch(endpoint, data, options).then(getData),
});

const instance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

instance.interceptors.request.use((request) => {
  const bearerToken = `Bearer ${localStorage.getItem("token")}`;
  request.headers.Authorization = bearerToken;

  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (
      (error.response.status === 401 &&
        !window.location.href.includes("/login")) ||
      (error.response.status === 403 &&
        error.response.data.error_message.includes("Token has expired"))
    ) {
      localStorage.removeItem("token");
      window.location.href = `/`;
    }

    return Promise.reject(error);
  }
);

export const apiClient = AxiosHttpClient(instance);
