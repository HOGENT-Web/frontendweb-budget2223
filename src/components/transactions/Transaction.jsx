import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
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

function Transaction({
  id, user, amount, place, date, onDelete,
}) {
  const handleDelete = useCallback((event) => {
    event.preventDefault();
    onDelete(id);
  }, [id, onDelete]);

  return (
    <tr data-cy="transaction">
      <td data-cy="transaction_date">
        {dateFormat.format(new Date(date))}
      </td>
      <td data-cy="transaction_user">{user.name}</td>
      <td data-cy="transaction_place">{place.name}</td>
      <td data-cy="transaction_amount">
        {amountFormat.format(amount)}
      </td>
      <td>
        <div className="btn-group float-end">
          <Link data-cy="transaction_edit_btn" type="button" className="btn btn-light" to={`/transactions/edit/${id}`}>
            <IoPencil />
          </Link>
          <button data-cy="transaction_remove_btn" type="button" className="btn btn-danger" onClick={handleDelete}>
            <IoTrashOutline />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default memo(Transaction);
