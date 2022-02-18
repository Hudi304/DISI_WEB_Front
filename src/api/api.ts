import axios from "axios";
import { msalInstance } from "../index";
import { loginRequest } from "./msalConfig";

export const ACCESS_TOKEN = "access_token";
export const SELECTED_WORKSPACE_ID = "selected_workspace_id";
export const WORKSPACE_ID = "{workspaceId}";

const cs_API_URL = process.env.REACT_APP_API_URL;
const API_URL = "";

export const API = (baseURL = API_URL, callOptions: any = {}): any => {
  const options = { headers: {}, baseURL, ...callOptions };

  const axiosInstance = axios.create(options);

  const token = getAccessToken();
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      config.url = (config.url || "").replace(/{workspaceId}/gm, sessionStorage.getItem(SELECTED_WORKSPACE_ID) || "");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (response?.data?.token) {
        setToken(response.data);
      }
      return Promise.resolve(response.data);
    },
    (error) => {
      const originalRequest = error.config;
      if (error?.response?.status === 401) {
        let accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          return msalInstance
            .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
            })
            .then((response: any) => {
              localStorage.setItem(ACCESS_TOKEN, response.accessToken);
              originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
              return axios(originalRequest)
                .then((res) => {
                  return res.data;
                })
                .catch((err) => {
                  return Promise.reject(err.response?.data);
                });
            })
            .catch((err) => {
              clearToken();
              return msalInstance
                .acquireTokenRedirect({
                  ...loginRequest,
                  account: accounts[0],
                })
                .then((response: any) => {
                  localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                  originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
                  return axios(originalRequest)
                    .then((res) => {
                      return res.data;
                    })
                    .catch((err) => {
                      return Promise.reject(err.response?.data);
                    });
                })
                .catch((err) => {
                  return Promise.reject(err.response?.data);
                });
            });
        } else {
          return msalInstance
            .loginRedirect({
              ...loginRequest,
            })
            .then((response: any) => {
              localStorage.setItem(ACCESS_TOKEN, response.accessToken);
              originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
              return axios(originalRequest)
                .then((res) => {
                  return res.data;
                })
                .catch((err) => {
                  return Promise.reject(err.response?.data);
                });
            })
            .catch((err) => {
              clearToken();
              return Promise.reject(err.response?.data);
            });
        }
      } else {
        return Promise.reject(error.response?.data);
      }
    }
  );

  return axiosInstance;
};

function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
