import { memo, useEffect, useState } from 'react';
import * as placesApi from '../../api/places';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

const validationRules = {
    user: {
        required: 'this is required',
        minLength: { value: 2, message: 'Min length is 2' },
    },
    date: { required: 'this is required' },
    place: { required: 'this is required' },
    amount: {
        valueAsNumber: true,
        required: 'this is required',
        min: { value: 1, message: 'min 1' },
        max: { value: 5000, message: 'max 5000' },
    }
};

const toDateInputString = (date) => {
    // ISO String without the trailing 'Z' is fine 🙄
    // (toISOString returns something like 2020-12-05T14:15:74Z,
    // datetime-local HTML5 input elements expect 2020-12-05T14:15:74, without the (timezone) Z)
    //
    // the best thing about standards is that we have so many to chose from!
    if (!date) return null;
    if (typeof date !== Object) {
        date = new Date(date);
    }
    let asString = date.toISOString();
    return asString.substring(0, asString.indexOf('T'));
};

function LabelInput({ label, name, type, ...rest }) {
    const {
        register,
        errors, isSubmitting
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
                <div className="form-text text-danger">
                    {errors[name].message}
                </div>
            ) : null}
        </div>
    );
}


function PlacesSelect() {
    const name = "place";
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);

    const {
        register,
        errors, isSubmitting
    } = useFormContext();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                setLoading(true);
                setError(null);
                const places = await placesApi.getAll();
                setPlaces(places);
            } catch (error) {
                console.error(error);
                setError(error.message || 'Failed to fetch the places, try again later');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, []);


    const hasError = name in errors;

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                Place
            </label>
            <select
                {...register(name)}
                id={name}
                className="form-select"
                disabled={loading || error || isSubmitting}
            >
                <option defaultChecked>
                    {loading ? 'Loading places... ' : (error || '-- Select a place --')}
                </option>
                {places.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
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



export default memo(function TransactionForm({ currentTransaction, onSaveTransaction }) {
    const { setValue, register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = (data) => {
        const { user, place, amount, date } = data;
        let transaction = {
            user,
            placeId: place,
            amount: parseInt(amount),
            date: new Date(date)
        };
        onSaveTransaction({ ...transaction, id: currentTransaction?.id })
        reset();
    };

    useEffect(() => {
        if (
            // check on non-empty object
            currentTransaction &&
            (Object.keys(currentTransaction).length !== 0 ||
                currentTransaction.constructor !== Object)
        ) {
            const dateAsString = toDateInputString(new Date(currentTransaction.date));
            setValue("date", dateAsString);
            setValue("user", currentTransaction.user.name);
            setValue("place", currentTransaction.place.id);
            console.log(currentTransaction.place.id);
            setValue("amount", currentTransaction.amount);
        } else {
            reset();
        }
    }, [currentTransaction, setValue, reset]);
    return (
        <>
            <h2>
                Add transaction
            </h2>
            <FormProvider handleSubmit={handleSubmit} errors={errors} register={register} isSubmitting={isSubmitting}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-50 mb-3">
                    <LabelInput
                        label="User"
                        name="user"
                        type="user" />

                    <LabelInput
                        label="Date"
                        name="date"
                        type="date" />

                    <PlacesSelect />

                    <LabelInput
                        label="Amount"
                        name="amount"
                        type="amount" />

                    <div className="clearfix">
                        <div className="btn-group float-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            > {currentTransaction?.id
                                ? "Save transaction"
                                : "Add transaction"}</button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    );
})
