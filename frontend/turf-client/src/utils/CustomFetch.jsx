
import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: 'https://your-api-base-url.com/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });