import { axiosInstance } from 'api/config';
import { PackDataOnServerType } from 'api/types';

export const dataAPI = {
  getPacks() {
    return axiosInstance
      .get<PackDataOnServerType>('cards/pack')
      .then(response => response.data);
  },
};
