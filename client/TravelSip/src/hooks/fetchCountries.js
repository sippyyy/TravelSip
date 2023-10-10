import axios from 'axios';
import {useEffect, useState} from 'react';
import {BASE_URL} from '@env'

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}api/v1/country/`);
      setCountries(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("call")
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return {countries, isLoading, error, refetch};
};

export default useFetchCountries;
