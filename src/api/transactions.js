import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import {
  useCallback,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/transactions`;

const useTransactions = () => {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getAll = useCallback(async () => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  }, [getAccessTokenSilently]);

  const getById = useCallback(async (id) => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }, [getAccessTokenSilently]);

  const save = useCallback(async (transaction) => {
    const token = await getAccessTokenSilently();
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
  }, [getAccessTokenSilently]);

  const deleteById = useCallback(async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [getAccessTokenSilently]);

  return {
    getAll,
    getById,
    save,
    deleteById,
  };
};

export default useTransactions;
