import axios from 'axios';
// import {getCookie} from './functions';
import {BASE_URL} from '@env';
export const request = axios.create({
  baseURL: BASE_URL,
});

export const request2 = axios.create({
  baseURL: BASE_URL,
});

request.defaults.headers.post['Content-Type'] = 'application/json';
request.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// const csrfToken = getCookie('csrftoken');

export const post = async (path, params, data, accessToken, formData) => {
  const optionsAuthorized = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let response;
  if (formData) {
    response = await request2.post(path, data, optionsAuthorized);
  } else {
    response = await request.post(path, data, optionsAuthorized);
  }
  return response;
};

export const postNoneAuthorized = async (path, params, data, access) => {
  const optionsNoneAuthorized = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      // 'X-CSRFToken': csrfToken,
    },
  };

  return await request.post(path, data, optionsNoneAuthorized);
};

export const getNoneAuthorized = async (
  path,
  params,
  data,
  access,
  formData,
) => {
  const optionsNoneAuthorized = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await request.get(path, {params, ...optionsNoneAuthorized});
};
export const get = async (path, params = {}, data, accessToken) => {
  const optionsAuthorized = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await request.get(path, {params, ...optionsAuthorized});
};

export const put = async (path, params, data, access, formData) => {
  const optionsAuthorized = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  let response;
  if (formData) {
    response = await request2.put(path, data, optionsAuthorized);
  } else {
    response = await request.put(path, data, optionsAuthorized);
  }
  return response;
};

export const del = async (path, params, data, accessToken) => {
  const optionsAuthorized = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await request.delete(path, optionsAuthorized);
  return response;
};

export default request;
