import { axiosInstance } from 'api/config';
import { GetPacksRequestParametersType, PackDataOnServerType } from 'api/types';
import { ZERO_LENGTH } from 'const';

export const dataAPI = {
  getPacks(requestParameters: GetPacksRequestParametersType) {
    // eslint-disable-next-line no-debugger
    debugger;
    let query = ``;
    const parameters = Object.keys(requestParameters);
    parameters.forEach(parameter => {
      // @ts-ignore
      if (requestParameters[parameter]) {
        query +=
          query.length > ZERO_LENGTH
            ? // @ts-ignore
              `&${parameter}=${requestParameters[parameter]}`
            : // @ts-ignore
              `?${parameter}=${requestParameters[parameter]}`;
      }
    });
    const url = parameters.length > ZERO_LENGTH ? `cards/pack${query}` : `cards/pack`;
    return axiosInstance.get<PackDataOnServerType>(url).then(response => response.data);
  },
};
