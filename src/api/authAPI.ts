import { axiosInstance } from 'api/config';
import { LoginDataType, LoginResponseType } from 'api/types';

export const authAPI = {
  login(authData: LoginDataType) {
    return axiosInstance
      .post<LoginResponseType>('auth/login', authData)
      .then(response => response.data);
  },
  // logout() {
  //   return axiosInstance.delete<LogoutResponseType>('auth/login');
  // },
  authMe() {
    return axiosInstance
      .get<LoginResponseType>('auth/me')
      .then(response => response.data);
  },
};
