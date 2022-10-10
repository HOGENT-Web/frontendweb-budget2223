import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/places`;

export const getAll = async () => {
  const {
    data
  } = await axios.get(baseUrl);

  return data.items;
};

export const save = async (place) => {
  const {
    id,
    ...values
  } = place;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${id ?? ''}`,
    data: values,
  });
};