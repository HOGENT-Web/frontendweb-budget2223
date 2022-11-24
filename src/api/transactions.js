import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useState,
  useEffect,
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/transactions`;

const useTransactions = () => {
  const [token, setToken] = useState(null);
  const {
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    async function getToken() {
      const newToken = await getAccessTokenSilently();
      // axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      setToken(newToken);
    }
    getToken();
  }, [getAccessTokenSilently]);

  const getAll = useCallback(async () => {
    const newToken = await getAccessTokenSilently();
    console.log(`calling getAll with token: ${newToken}`);
    const {
      data,
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${newToken}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  const getById = useCallback(async (id) => {
    const {
      data,
    } = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [token]);

  const save = useCallback(async (transaction) => {
    const {
      id,
      ...values
    } = transaction;
    await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ?? ''}`,
      data: values,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }, [token]);

  const deleteById = useCallback(async (id) => {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [token]);

  return {
    getAll,
    getById,
    save,
    deleteById,
  };
};

export default useTransactions;