import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}/transactions`;

export const getAll = async () => {
  const {
    data
  } = await axios.get(baseUrl);

  return data.items;
};

export const deleteById = async (id) => {
  await axios.delete(
    `${baseUrl}/${id}`
  );
};

export const save = async (transaction) => {
  const {
    id,
    ...values
  } = transaction;
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${id ?? ''}`,
    data: values,
  });
};