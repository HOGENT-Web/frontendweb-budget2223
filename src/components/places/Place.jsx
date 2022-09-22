import { memo, useCallback } from 'react';
import StarRating from './StarRating';

const Place = memo(({ id, name, rating, onRate }) => {

  const handleRate = useCallback((newRating) => {
    onRate(id, newRating);
  }, [id, onRate])

  return (
    <div className="card bg-light border-dark mb-4">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <StarRating
          selectedStars={rating}
          onRate={handleRate}
        />
      </div>
    </div>
  );
});

export default Place;
