import { memo, useCallback } from 'react';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';

// kan ook met react-intl (https://formatjs.io/docs/getting-started/installation/)
const dateFormat = new Intl.DateTimeFormat('nl-BE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const amountFormat = new Intl.NumberFormat('nl-BE', {
  currency: 'EUR',
  style: 'currency',
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export default memo(function Transaction({ id, user, amount, place, date, onDelete, onEdit }) {

  const handleDelete = useCallback((event) => {
    event.preventDefault();
    onDelete(id);
  }, [id, onDelete]);

  const handleUpdate = useCallback((event) => {
    event.preventDefault();
    onEdit(id);
  }, [id, onEdit]);

  return (
    <tr>
      <td>
        {dateFormat.format(new Date(date))}
      </td>
      <td>{user.name}</td>
      <td>{place.name}</td>
      <td>
        {amountFormat.format(amount)}
      </td>
      <td>
        <div className="btn-group float-end">
          <button type="button" className="btn btn-light" onClick={handleUpdate}>
            <IoPencil />
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <IoTrashOutline />
          </button>
        </div>
      </td>
    </tr>
  );
})
