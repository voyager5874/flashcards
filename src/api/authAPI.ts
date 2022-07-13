import { axiosInstance } from 'api/config';
import {
  LoginParameterType,
  LoginResponseType,
  LogoutResponseType,
  PasswordForgottenParameterType,
  ResetPasswordParameterType,
  ResetPasswordResponseType,
  SignUpParameterType,
  SignUpResponseType,
  UpdateProfileParameterType,
  UpdateProfileResponseType,
} from 'api/types';

export const authAPI = {
  login(authData: LoginParameterType) {
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
  passwordForgotten(email: string) {
    const data: PasswordForgottenParameterType = {
      email,
      from: 'alex void<voyager5874@gmail.com>',
      message: `<div style="padding: 15px"> 
                        password recovery link: 
                        <a href='http://localhost:3000/password-set/$token$'>link</a>
                </div>`,
    };
    return axiosInstance
      .post<ResetPasswordResponseType>('/auth/forgot', data)
      .then(response => response.data);
  },
  resetPassword(data: ResetPasswordParameterType) {
    axiosInstance.post<ResetPasswordResponseType>('auth/set-new-password', data);
  },
};
