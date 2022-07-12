import { axiosInstance } from 'api/config';
import {
  LoginDataType,
  LoginResponseType,
  LogoutResponseType,
  SignUpParameterType,
  SignUpResponseType,
  UpdateProfileParameterType,
  UpdateProfileResponseType,
} from 'api/types';

export const authAPI = {
  login(authData: LoginDataType) {
    return axiosInstance
      .post<LoginResponseType>('auth/login', authData)
      .then(response => response.data);
  },
  logout() {
    return axiosInstance
      .delete<LogoutResponseType>('auth/me')
      .then(response => response.data);
  },
  authMe() {
    return axiosInstance
      .post<LoginResponseType>('auth/me')
      .then(response => response.data);
  },
  updateProfile(data: UpdateProfileParameterType) {
    return axiosInstance
      .put<UpdateProfileResponseType>('auth/me', data)
      .then(response => response.data);
  },
  signUp(data: SignUpParameterType) {
    return axiosInstance
      .post<SignUpResponseType>('/auth/register', data)
      .then(response => response.data);
  },
};
