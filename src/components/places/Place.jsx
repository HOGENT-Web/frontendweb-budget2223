import { memo, useCallback, useContext } from 'react';
import { ThemeContext } from '../../contexts/Theme.context';
import StarRating from './StarRating';

const Place = memo(({ id, name, rating, onRate }) => {

  const { theme, oppositeTheme } = useContext(ThemeContext);

  const handleRate = useCallback((newRating) => {
    onRate(id, newRating);
  }, [id, onRate])

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
