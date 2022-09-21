import StarRating from './StarRating';

const Place = ({ id, name, rating, onRate }) => {

  const handleRate = (newRating) => {
    onRate(id, newRating);
  }

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
}

export default Place;
