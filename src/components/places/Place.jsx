import { memo, useCallback } from 'react';
import { useThemeColors } from '../../contexts/Theme.context';
import StarRating from './StarRating';

const Place = memo(({ id, name, rating, onRate }) => {

  const { theme, oppositeTheme } = useThemeColors();

  const handleRate = useCallback(async (newRating) => {
    await onRate({
      id,
      name,
      rating: newRating,
    });
  }, [id, name, onRate]);

  return (
    <div className={`card bg-${theme} border-${oppositeTheme} mb-4`}>
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
