import { axiosInstance } from 'api/config';
import {
  LoginParameterType,
  LoginResponseType,
  LogoutResponseType,
  PasswordForgottenParameterType,
  PasswordForgottenRequestDataType,
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
  passwordForgotten(data: PasswordForgottenParameterType) {
    const requestData: PasswordForgottenRequestDataType = {
      email: data.email,
      from: `${data.senderName}<${data.senderEmail}>`,
      message: `<div style="padding: 15px"> 
                        password recovery link: 
                        <a href='${data.origin}/password-reset/$token$'>link</a>
                </div>`,
    };
    return axiosInstance
      .post<ResetPasswordResponseType>('/auth/forgot', requestData)
      .then(response => response.data);
  },
  resetPassword(data: ResetPasswordParameterType) {
    axiosInstance.post<ResetPasswordResponseType>('auth/set-new-password', data);
  },
};
