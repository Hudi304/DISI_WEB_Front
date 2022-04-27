import axios from "axios";
export const ACCESS_TOKEN = "access_token";
const API_URL = "https://matei-anechitei-ds-2.herokuapp.com";
// const API_URL = "http://localhost:8081";

export const API = (baseURL = API_URL, callOptions: any = {}): any => {
  const options = { headers: {}, baseURL, ...callOptions };
  const axiosInstance = axios.create(options);
  const token = getAccessToken();

  const getTk = getAccessToken();

  console.log("auth headers", token);
  console.log("getTk", getTk);

  // if (typeof token == "string") {
  if (typeof token == "string" && token != "") {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log("bearer");
  }

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response?.data?.token) {
        setToken(response?.data?.token);
      }
      return Promise.resolve(response?.data);
    },
    (error) => {
      switch (error?.response?.status) {
        case 401:
          console.log("Request failed with status 401  Unauthorized ");
          clearToken();
          return Promise.resolve(error?.response?.status);

        case 404:
          console.log("Request failed with status 404  NOT FOUND ");
          return Promise.resolve({ message: error?.message, status: error?.response?.status });
      }
      return Promise.resolve({ message: error, status: error?.response?.status });
    }
  );

  return axiosInstance;
};

function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
