const {post, postNoneAuthorized, put} = require('./utils/methods');
import {BASE_URL} from '@env';
export const httpRequest = async ({
  method,
  endpoint,
  params,
  dataInput,
  accessToken,
  setIsLoading,
  setOutput,
  setError,
  navigation,
}) => {
  let httpMethod;
  switch (method) {
    case 'post-auth':
      httpMethod = post;
      break;
    case 'post':
      httpMethod = postNoneAuthorized;
      break;
    case 'put':
      httpMethod = put;
      break;
  }
  setIsLoading(true);
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
      navigation.navigate('AuthTop');
    }
    return data;
  }
};
