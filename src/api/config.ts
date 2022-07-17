import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_LOCAL,
  // baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  // headers: {
  //     'token': process.env.REACT_APP_token as string,
  // },
});
