import { memo, useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import useTransactions from '../../api/transactions';
import usePlaces from '../../api/places';
import Error from '../Error';

const validationRules = {
  date: { required: 'this is required' },
  place: { required: 'this is required' },
  amount: {
    valueAsNumber: true,
    required: 'this is required',
    min: { value: 1, message: 'min 1' },
    max: { value: 5000, message: 'max 5000' },
  },
};

const toDateInputString = (date) => {
  // ISO String without the trailing 'Z' is fine 🙄
  // (toISOString returns something like 2020-12-05T14:15:74Z,
  // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
  //
  // the best thing about standards is that we have so many to chose from!
  if (!date) return null;
  if (typeof date !== 'object') {
    // eslint-disable-next-line no-param-reassign
    date = new Date(date);
  }
  const asString = date.toISOString();
  return asString.substring(0, asString.indexOf('T'));
};

function LabelInput({
  label, name, type, ...rest
}) {
  const {
    register,
    errors, isSubmitting,
  } = useFormContext();

  const hasError = name in errors;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...register(name, validationRules[name])}
        id={name}
        type={type}
        className="form-control"
        disabled={isSubmitting}
        {...rest}
      />
      {hasError ? (
        <div className="form-text text-danger" data-cy="labelinput-error">
          {errors[name].message}
        </div>
      ) : null}
    </div>
  );
}

function PlacesSelect(props) {
  const name = 'place';
  const placesApi = usePlaces();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);

  const {
    register,
    errors, isSubmitting,
  } = useFormContext();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const allPlaces = await placesApi.getAll();
        setPlaces(allPlaces);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch the places, try again later');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  const hasError = name in errors;

  return (
    <div className="mb-3">
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={name} className="form-label">
        Place
      </label>
      <select
        {...register(name)}
        {...props}
        id={name}
        className="form-select"
        disabled={loading || error || isSubmitting}
      >
        <option defaultChecked>
          {loading ? 'Loading places... ' : (error || '-- Select a place --')}
        </option>
        {places.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      {hasError ? (
        <div className="form-text text-danger">
          {errors[name].message}
        </div>
      ) : null}
    </div>
  );
}

const TransactionForm = memo(() => {
  const {
    user,
  } = useAuth0();
  const [error, setError] = useState(null);
  const {
    setValue, register, handleSubmit, reset, formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { save, getById } = useTransactions();

  const onSubmit = async (data) => {
    const {
      place, amount, date,
    } = data;
    try {
      setError(null);
      await save({
        id,
        placeId: place,
        amount: parseInt(amount, 10),
        date: new Date(date),
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  useEffect(() => {
    if (!id) {
      reset();
      return;
    }

    const fetchTransaction = async () => {
      try {
        setError(null);
        const transaction = await getById(id);
        setValue('place', transaction.place.id);
        setValue('amount', transaction.amount);
        setValue('date', toDateInputString(transaction.date));
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };

    fetchTransaction();
  }, [id, setValue, reset, getById]);

  return (
    <>
      <h2>
        Add transaction
      </h2>
      <Error error={error} />

      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        isSubmitting={isSubmitting}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mb-3">
          <p>
            This transaction will be created for
            {' '}
            {user.name}
          </p>

          <LabelInput
            label="Date"
            name="date"
            type="date"
            data-cy="date_input"
          />

          <PlacesSelect data-cy="place_input" />

          <LabelInput
            label="Amount"
            name="amount"
            type="amount"
            data-cy="amount_input"
          />

          <div className="clearfix">
            <div className="btn-group float-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                data-cy="submit_transaction"
              >
                {' '}
                {id
                  ? 'Save transaction'
                  : 'Add transaction'}
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
});

export default TransactionForm;
