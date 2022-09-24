import { memo, useCallback } from 'react';
import StarRating from './StarRating';

const Place = memo(({ id, name, rating, onRate, onDelete }) => {

  const handleRate = useCallback((newRating) => {
    onRate(id, newRating);
  }, [id, onRate])

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <div className="card bg-light border-dark mb-4">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <StarRating
          selectedStars={rating}
          onRate={handleRate}
        />
        <button class="btn btn-primary" onClick={handleDelete}>
          Verwijder
        </button>
      </div>
    </div>
  );
});

export default Place;
