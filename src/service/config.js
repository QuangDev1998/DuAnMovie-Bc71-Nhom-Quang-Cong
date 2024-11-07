import axios from "axios";
import { store } from "../index";
import { turnOffLoading, turnOnLoading } from "../redux/spinnerSlice";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjE0LzAzLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MTkxMDQwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQyMDU4MDAwfQ.aL6UU86iw9qfiazPYi9hHV3FjYthitqZbK5pBfChSiU";

export let http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/",
  headers: {
    TokenCybersoft: token,
  },
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("send request");
    store.dispatch(turnOnLoading());
    return config;
  },
  function (error) {
    // Do something with request error
    store.dispatch(turnOnLoading());
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("receive response");
    store.dispatch(turnOffLoading());

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.dispatch(turnOffLoading());
    return Promise.reject(error);
  }
);
