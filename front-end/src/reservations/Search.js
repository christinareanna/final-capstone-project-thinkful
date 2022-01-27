import React, { useState } from "react";
import { useHistory } from "react-router";
import { listReservations } from "../utils/api";
import Reservation from "../reservations/Reservation"
// import ErrorAlert from "../layout/ErrorAlert";

export default function Search() {
    const history = useHistory();
    const [number, setNumber] = useState("");
    const [reservations, setReservations] = useState([]);
    const handleChange = (e) => {
        setNumber(e.target.value);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const AC = new AbortController();
        listReservations({ mobile_number: number }, AC.signal)
            .then(setReservations)
            .then(() => setNumber(""))
            .catch(console.error);
        return () => AC.abort();
    };


    return (
        <>
            <div className="header">
                <h1>Search By Phone Number</h1>
            </div>
            {/* <ErrorAlert error={error} /> */}
            <form name="search" onSubmit={handleSearch}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="mobile_number"
                        placeholder="Enter phone number"
                        onChange={handleChange}
                        value={number}
                    />
                </div>
                <button type="submit" className="btn btn-dark">Find</button>
                <button type="cancel" className="btn btn-dark" onClick={() => history.goBack()}>Cancel</button>
            </form >
            {!reservations.length && <h3>No reservations found.</h3>}
            <Reservation res={reservations} />
        </>
    )
}