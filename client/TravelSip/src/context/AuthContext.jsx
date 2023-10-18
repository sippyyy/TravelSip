import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  getSecureValue,
  removeSecureValue,
  setSecureValue,
} from '../api/secureValue';
import jwt_decode from 'jwt-decode';
import {httpRequest} from '../api/services';
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    refreshToken: null,
    authenticated: false,
    id: null,
  });
  const verifyAuthentication = async () => {
    const token = await getSecureValue('refresh_token');
    const result = await httpRequest({
      method: 'post',
      endpoint: 'login/verify/',
      dataInput: {token},
    });
    if (result.status === 200) {
      const newToken = await httpRequest({
        method: 'post',
        endpoint: 'login/refresh/',
        dataInput: {refresh: token},
      });
      if (newToken.data) {
        const {access, refresh} = newToken.data;
        setSecureValue('access_token', access);
        setSecureValue('refresh_token', refresh);
      }
    }
  };

  const logOut = async () => {
    await removeSecureValue('access_token');
    await removeSecureValue('refresh_token');
  };

  const loadToken = async () => {
    const accessToken = await getSecureValue('access_token');
    const refreshToken = await getSecureValue('refresh_token');
    if (accessToken && refreshToken) {
      const user_data_decoded = jwt_decode(accessToken).user_id;
      setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
        id: user_data_decoded,
      });
    }
  };

  useEffect(() => {
    verifyAuthentication();
    loadToken();
  }, []);

  const value = {authState, verifyAuthentication, logOut, loadToken};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
