import {
  useAuth0,
} from '@auth0/auth0-react';
import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/places`;

const usePlaces = () => {
  const {
    getAccessTokenSilently,
  } = useAuth0();

  const getAll = async () => {
    const token = await getAccessTokenSilently();
    const {
      data,
    } = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.items;
  };

  const save = async (place) => {
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
  };

  return {
    getAll,
    save,
  };
};

export default usePlaces;
