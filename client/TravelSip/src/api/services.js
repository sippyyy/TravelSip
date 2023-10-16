const {post, postNoneAuthorized, put, get} = require('./utils/methods');
import {BASE_URL} from '@env';
import {setSecureValue} from './secureValue';
export const httpRequest = async ({
  method,
  endpoint,
  params,
  dataInput,
  accessToken,
  setOutput,
  setError,
  navigation,
  token_refresh,
}) => {
  let httpMethod;
  switch (method) {
    case 'post-auth':
      httpMethod = post;
      break;
    case 'post':
      httpMethod = postNoneAuthorized;
      break;
    case 'get':
      httpMethod = get;
      break;
    case 'put':
      httpMethod = put;
      break;
  }
  // setIsLoading(true);
  let res = '';
  try {
    res = await httpMethod(
      `${BASE_URL}${endpoint}`,
      params,
      dataInput,
      accessToken,
    );
    const {status, data, message} = res;
    if (status === 200 || status === 201) {
      const result = {status, data};
      return result;
    } else {
      console.log(message ? message : 'Something went wrong');
    }
  } catch (err) {
    const {status, data} = err.response;
    if (status === 403 || status === 401) {
      const dataIn = {refresh: token_refresh};
      if (accessToken) {
        const refreshTokens = async () => {
          try {
            const newToken = await postNoneAuthorized(
              `${BASE_URL}login/refresh/`,
              '',
              dataIn,
            );

            if (newToken.data) {
              const {access, refresh} = newToken.data; // Destructure the data
              setSecureValue('access_token', access);
              setSecureValue('refresh_token', refresh);
            } else {
              navigation.navigate('AuthTop');
            }
          } catch (error) {
            navigation.navigate('AuthTop');
            console.error('Error:', error);
          }
        };

        // Call the refreshTokens function
        refreshTokens();
      } else {
        navigation.navigate('AuthTop');
      }
    }
    return data;
  }
};
