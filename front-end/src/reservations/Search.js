import React, { useState } from 'react';
import ErrorAlert from '../layout/ErrorAlert';
import { listReservations } from '../utils/api';
import ReservationsList from '../reservations/ReservationsList';

function Search() {
    const [search, setSearch] = useState({
        mobile_number: "",
    });
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);

    const abortController = new AbortController();
    // Handle submit that shows all reservations when button is clicked
    function submitHandler(event) {
        event.preventDefault();
        listReservations(search, abortController.signal)
            .then(setReservations)
            .catch(setError);
        return () => abortController.abort();
    }

    // Handle change that changes what is shown based on what is found when number is typed in (if number matches a reservation)

    function changeHandler({ target: { name, value } }) {
        setSearch((previousSearch) => ({
            ...previousSearch,
            [name]: value,
        }));
    }

    return (
        <main>
            <h1 className="mb-3">Search</h1>
            <ErrorAlert error={error} />
            <section>
                <form onSubmit={submitHandler}>
                    <div className="row mb-3">
                        <div className="col form-group">
                            <label className="form-label" htmlFor="mobile_number" style={{fontSize: "30px"}}>
                                Mobile Number
                            </label>
                            <input
                                style={{ width: "100%"}}
                                className="text-center"
                                id="mobile_number"
                                name="mobile_number"
                                type="text"
                                placeholder="Enter a customer's phone number"
                                value={search.mobile_number}
                                onChange={changeHandler}
                                required={true}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-info mb-3">
                            Find
                        </button>
                    </div>
                </form>
            </section>
            <section>
                {/* Component that shows all reservations in search form */}
                <ReservationsList reservations={reservations} />
            </section>
        </main>
    );
}
export default Search;