import axios from 'axios';
// import {getCookie} from './functions';
import {BASE_URL} from '@env';
export const request = axios.create({
  baseURL: BASE_URL,
});

request.defaults.headers.post['Content-Type'] = 'application/json';

// const csrfToken = getCookie('csrftoken');

export const post = async (path, data, accessToken) => {
  const optionsAuthorized = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await request.post(path, data, optionsAuthorized);
};

export const postNoneAuthorized = async (path, data) => {
  const optionsNoneAuthorized = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      // 'X-CSRFToken': csrfToken,
    },
  };

  return await request.post(path, data, optionsNoneAuthorized);
};

export const getNoneAuthorized = async (path, data) => {
  const optionsNoneAuthorized = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await request.get(path, data, optionsNoneAuthorized);
};
export const get = async (path, params = {}, accessToken) => {
  const optionsAuthorized = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return await request.get(path, {params, ...optionsAuthorized});
};

export const put = async (path, data, accessToken) => {
  const optionsAuthorized = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await request.put(path, data, optionsAuthorized);
  return response;
};

export const del = async (path, accessToken) => {
  const optionsAuthorized = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = await request.delete(path, optionsAuthorized);
  return response;
};

export default request;