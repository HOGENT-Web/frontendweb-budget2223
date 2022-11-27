import { memo, useCallback, useMemo } from 'react';
import { IoStarSharp } from 'react-icons/io5';

function Star({ index, selected = false, onSelect = (f) => f }) {
  const handleSelect = useCallback(() => {
    onSelect(index + 1);
  }, [index, onSelect]);

  return (
    <IoStarSharp
      color={selected ? 'yellow' : 'grey'}
      onClick={handleSelect}
    />
  );
}

const MemoizedStar = memo(Star);

export default function StarRating({ totalStars = 5, selectedStars = 0, onRate }) {
  const stars = useMemo(
    () => [...new Array(totalStars)],
    [totalStars],
  );

  return (
    <>
      {stars.map((_, i) => (
        <MemoizedStar
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          index={i}
          selected={selectedStars > i}
          onSelect={onRate}
        />
      ))}
      <p>
        {selectedStars}
        {' '}
        of
        {totalStars}
        {' '}
        stars
      </p>
    </>
  );
}
