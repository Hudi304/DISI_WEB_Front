import axios from "axios";

export const ACCESS_TOKEN = "access_token";

// const cs_API_URL = process.env.REACT_APP_API_URL;
const API_URL = "https://matei-anechitei-ds-2.herokuapp.com";

export const API = (baseURL = API_URL, callOptions: any = {}): any => {
  const options = { headers: {}, baseURL, ...callOptions };
  const axiosInstance = axios.create(options);
  const tokenLS = getAccessToken();
  const token = JSON.parse(tokenLS || "{}");

  console.log("auth headers", token.token);

  if (typeof token.token == "string") {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.token}`;
    console.log("bearer");
  }

  // console.log("API invocation");
  // console.log("baseURL : ", baseURL);
  // console.log("callOptions : ", callOptions);

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("response 🔥 : ", response.data);
      if (response?.data?.token) {
        setToken(response.data.token);
        // console.log("setToken : ", response.data);
      }
      return Promise.resolve(response.data);
    },
    (error) => {
      // console.log("Error : ", error);
      if (error.response.status === 401) {
        console.log("Request failed with status 401  Unauthorized ");
        clearToken();
      }
      return Promise.resolve(error);
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

function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
