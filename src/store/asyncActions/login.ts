import { authAPI } from 'api';
import { LoginDataType } from 'api/types';
import { setLoginStatus } from 'store/reducers/login';
import { AppDispatch } from 'store/types';

export const login = (credentials: LoginDataType) => async (dispatch: AppDispatch) => {
  try {
    const response = await authAPI.login(credentials);
    if (!response.error) {
      dispatch(setLoginStatus(true));
      console.log(response.email);
      console.log(response.token);
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.log(error);
  }
};
