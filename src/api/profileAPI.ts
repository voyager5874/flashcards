import { axiosInstance } from 'api/config';

export const profileAPI = {
  changeAvatar() {
    return axiosInstance.put('auth/me', {});
  },
};
