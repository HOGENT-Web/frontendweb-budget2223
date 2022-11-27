import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';
import { useCallback, useMemo } from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/places`;

const usePlaces = () => {
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

  const save = useCallback(async (place) => {
    const token = await getAccessTokenSilently();
    const {
      id,
      ...values
    } = place;
    await axios({
      method: id ? 'PUT' : 'POST',
      url: `${baseUrl}/${id ?? ''}`,
      data: values,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [getAccessTokenSilently]);

  const placesApi = useMemo(() => ({
    getAll,
    save,
  }), [getAll, save]);
  return placesApi;
};

export default usePlaces;
