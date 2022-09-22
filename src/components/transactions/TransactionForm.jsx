import { memo } from 'react';
import { PLACE_DATA } from '../../api/mock-data';
import { useForm } from 'react-hook-form';

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
            <form onSubmit={handleSubmit(onSubmit)} className="w-50 mb-3">
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Who</label>
                    <input
                        {...register('user',
                            { required: 'user is required', minLength: { value: 2, message: 'Min length is 2' } })}
                        defaultValue=''
                        id="user"
                        type="text"
                        className="form-control"
                        placeholder="user" required
                    />
                    {errors.user && <p className="form-text text-danger">{errors.user.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        {...register('date',
                            { required: 'date is required' })}
                        id="date"
                        type="date"
                        className="form-control"
                        placeholder="date"
                    />
                    {errors.date && <p className="form-text text-danger">{errors.date.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="places" className="form-label">
                        Place
                    </label>
                    <select
                        {...register('place',
                            { required: 'place is required' })}
                        id="places"
                        className="form-select"
                        required
                    >
                        <option defaultChecked value="">-- Select a place --</option>
                        {PLACE_DATA.map(({ id, name }) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </select>
                    {errors.place && <p className="form-text text-danger">{errors.place.message}</p>}
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <input
                        {...register('amount',
                            { required: 'amount is required' })}
                        id="amount"
                        type="number"
                        className="form-control"
                        required
                    />
                    {errors.amount && <p className="form-text text-danger">{errors.amount.message}</p>}
                </div>

                <div className="clearfix">
                    <div className="btn-group float-end">
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >Add transaction</button>
                    </div>
                </div>
            </form>
        </>
    );
})
