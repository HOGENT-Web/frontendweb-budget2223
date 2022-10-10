import { memo } from 'react';
import { PLACE_DATA } from '../../api/mock-data';
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
        errors
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

    const {
        register,
        errors,
    } = useFormContext();

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
            >
                <option defaultChecked value="">-- Select a place --</option>
                {PLACE_DATA.map(({ id, name }) => (
                    <option key={id} value={name}>{name}</option>
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



export default memo(function TransactionForm({ onSaveTransaction }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(JSON.stringify(data));
        const { user, place, amount, date } = data;
        onSaveTransaction(user, place, parseInt(amount), toDateInputString(date));
        reset();
    };

    return (
        <>
            <h2>
                Add transaction
            </h2>
            <FormProvider handleSubmit={handleSubmit} errors={errors} register={register}>
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
                                className="btn btn-primary"
                            >Add transaction</button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    );
})
