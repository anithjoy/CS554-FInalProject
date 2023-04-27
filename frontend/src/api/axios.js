import axios from "axios";

export const axiosNoAuth = axios.create({
  baseURL: "http://localhost:3000",
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:3000",
});

axiosAuth.interceptors.request.use((config) => {
  const token_data = localStorage.getItem("token_data");
  if (token_data) {
    const token = JSON.parse(token_data);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
