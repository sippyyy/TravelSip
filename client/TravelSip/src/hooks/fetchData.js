import {useEffect, useState} from 'react';
import {BASE_URL} from '@env';
import {
  post,
  get,
  del,
  put,
  postNoneAuthorized,
  getNoneAuthorized,
} from '../api/utils/methods';

const useFetchData = ({method, endpoint, params, dataInput, accessToken}) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    let httpMethod;
    switch (method) {
      case 'post-auth':
        httpMethod = post;
        break;
      case 'post':
        httpMethod = postNoneAuthorized;
        break;
      case 'get-auth':
        httpMethod = get;
        break;
      case 'get':
        httpMethod = getNoneAuthorized;
        break;
      case 'del':
        httpMethod = del;
        break;
      case 'put':
        httpMethod = put;
        break;
    }
    setIsLoading(true);
    try {
      const response = await httpMethod(
        `${BASE_URL}${endpoint}`,
        params,
        dataInput,
        accessToken,
      );
      setOutput(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return {output, isLoading, error, refetch};
};

export default useFetchData;
