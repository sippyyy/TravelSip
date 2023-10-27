const {
  post,
  postNoneAuthorized,
  put,
  get,
  getNoneAuthorized,
  del,
} = require('./utils/methods');
import {BASE_URL} from '@env';
export const httpRequest = async ({
  method,
  endpoint,
  params,
  dataInput,
  accessToken,
  setOutput,
  setError,
  formData,
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
    case 'get-none-auth':
      httpMethod = getNoneAuthorized;
      break;
    case 'put':
      httpMethod = put;
      break;
    case 'del':
      httpMethod = del;
  }
  let res = '';
  try {
    res = await httpMethod(
      `${BASE_URL}${endpoint}`,
      params,
      dataInput,
      accessToken,
      formData,
    );
    const {status, data, message} = res;
    if (status === 200 || status === 201 || status === 204) {
      const result = {status, data};
      return result;
    } else {
      console.log(message ? message : 'Something went wrong');
    }
  } catch (err) {
    const {status, data} = err?.response ?? {status: null, data: null};
    return {status, data};
  }
};
