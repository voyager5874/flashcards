import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_LOCAL,
  withCredentials: true,
  // headers: {
  //     'API-KEY': process.env.REACT_APP_API_KEY as string,
  // },
});
