import { useState } from 'react';
import { PLACE_DATA } from '../../api/mock-data';

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

export default function TransactionForm({ onSaveTransaction }) {
    const [user, setUser] = useState('');
    const [date, setDate] = useState(new Date());
    const [place, setPlace] = useState('home');
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveTransaction(user, place, amount, date);
        setUser('');
        setDate(new Date());
        setPlace('home');
        setAmount(0);
    };

    return (
        <>
            <h2>
                Add transaction
            </h2>
            <form onSubmit={handleSubmit} className="w-50 mb-3">
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Who</label>
                    <input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        id="user"
                        type="text"
                        className="form-control"
                        placeholder="user" required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        value={toDateInputString(date)}
                        onChange={(e) => setDate(e.target.value)}
                        id="date"
                        type="date"
                        className="form-control"
                        placeholder="date"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="places" className="form-label">
                        Place
                    </label>
                    <select
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        id="places"
                        className="form-select"
                        required
                    >
                        <option defaultChecked value="">-- Select a place --</option>
                        {PLACE_DATA.map(({ id, name }) => (
                            <option key={id} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">
                        Amount
                    </label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        id="amount"
                        type="number"
                        className="form-control"
                        required
                    />
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
}
