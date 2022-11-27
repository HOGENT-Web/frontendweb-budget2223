import { useState, useCallback, useEffect } from 'react';
import Place from './Place';
import Error from '../Error';
import Loader from '../Loader';
import usePlaces from '../../api/places';

function PlacesCards({ places, onRate }) {
  return (
    <div className="grid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
        {places
          .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
          .map((p) => (
            <div className="col" key={p.id}>
              <Place {...p} onRate={onRate} />
            </div>
          ))}
      </div>
    </div>
  );
}

function PlacesList() {
  const placesApi = usePlaces();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await placesApi.getAll();
        setPlaces(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const handleRatePlace = useCallback(async (updatedPlace) => {
    try {
      setError(null);
      await placesApi.save(updatedPlace);
      // of gewoon opnieuw ophalen
      setPlaces(
        places.map((place) => (place.id === updatedPlace?.id ? updatedPlace : place)),
      );
    } catch (err) {
      setError(err);
    }
  }, []);

  return (
    <>
      <h1>Places</h1>

      <Loader loading={loading} />
      <Error error={error} />
      {!loading && !error ? <PlacesCards places={places} onRate={handleRatePlace} /> : null}
    </>
  );
}

export default PlacesList;
