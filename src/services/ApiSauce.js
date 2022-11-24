// @flow
import _ from 'lodash';
import {create} from 'apisauce';
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE,
} from '../config/WebService';
import util from '../util';
import {logoutUser} from './generalHelper';
import {strings} from '../constants';
import {Actions} from 'react-native-router-flux';
const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
});

const onForbidden = async () => {
  const newToken = await util.refreshAccessToken();
  if (newToken) {
    return newToken;
  }
  Actions.reset('login');
  return false;
};
class ApiSauce {
  async post(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.post(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    if (response.status === 401) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        console.log({newToken});

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.post(url, data, {
        headers,
      });
      console.log({responseNew});
      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async get(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.get(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log(response);
    }

    if (response.status === 401) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        console.log({newToken});

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.get(url, data, {
        headers,
      });
      console.log({responseNew});
      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async delete(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.delete(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('headers', headers);
      console.log('data', data);
      console.log(response);
    }

    if (response.status === 401) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        console.log({newToken});

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.delete(url, data, {
        headers,
      });
      console.log({responseNew});
      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async put(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.put(url, data, {
      headers,
    });

    if (__DEV__ && API_LOG) {
      console.log('url', url);
      console.log('data', data);
      console.log('headers', headers);
      console.log(response);
    }

    if (response.status === 401) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        console.log({newToken});

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.put(url, data, {
        headers,
      });
      console.log({responseNew});
      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  manipulateResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (
          response.status === 401 &&
          response?.data?.message === 'Unauthenticated'
        ) {
          logoutUser();
          util.topAlertError(
            response?.data?.message ?? strings.SOMETHING_WENT_WRONG,
          );
          // session expired, logout user forcefully
          // logoutUserHelper();
        }

        if (response.status === 403) {
          logoutUser();
          Actions.reset('login');
          util.topAlertError(
            response?.data?.message ?? strings.SOMETHING_WENT_WRONG,
          );
        }

        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }

        if (response.status === 400) {
          util.topAlertError(
            response?.data?.message ?? strings.SOMETHING_WENT_WRONG,
          );
        }

        if (response.status === 500) {
          util.topAlertError(response?.data ?? strings.SOMETHING_WENT_WRONG);
        }

        if (response.problem === 'NETWORK_ERROR') {
          reject(ERROR_NETWORK_NOT_AVAILABLE);
        }

        reject(response?.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }
}

export default new ApiSauce();
