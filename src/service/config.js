import axios from "axios";
import { store } from "../index";
import { turnOffLoading, turnOnLoading } from "../redux/spinnerSlice";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MSIsIkhldEhhblN0cmluZyI6IjI1LzEyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0MzcyNDgwMDAwMCIsIm5iZiI6MTcxNDA2NDQwMCwiZXhwIjoxNzQzODcyNDAwfQ.Mm0wS11uUmrRuKhS3VjTKyUZu23p8fbZ8mubns_phes";

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
