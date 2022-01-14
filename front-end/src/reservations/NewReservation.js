import React, { useState, useEffect, Link } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

// fetchJson, createTable, seatReservation, 
// listReservations, fetchJson
// formatAsDate, formatAsTime, asDateString
export default function NewReservation({

}) {
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    });

    return (
        <>
            {/* on submit form, change values later*/}
            <form>
                <ErrorAlert error={errors} />
                <label htmlFor="first_name" className="mt-3 mr-1">First Name:&nbsp;</label>
                <input
                    name="first_name"
                    id="first_name"
                    type="text"
                    placeholder="First Name"
                    required
                />
                <label htmlFor="last_name" className="mt-3 ml-3">Last Name:</label>
                <input
                    name="last_name"
                    id="last_name"
                    type="text"
                    placeholder="Last Name"
                    required
                />
                <br />
                <label htmlFor="mobile_number" className="mt-3 mr-1">Mobile Number:</label>
                <input
                    name="mobile_number"
                    id="mobile_number"
                    type="tel"
                    placeholder="xxx-xxx-xxxx"
                    required
                />
                <br />
                <label htmlFor="reservation_date">Date:&nbsp;</label>
                <input
                    name="reservation_date"
                    id="reservation_date"
                    type="date"
                    className="form-control mb-2"
                    placeholder="YYYY-MM-DD" 
                    pattern="\d{4}-\d{2}-\d{2}"
                    required
                />
                <label htmlFor="reservation_time">Time:&nbsp;</label>
                <input
                    name="reservation_time"
                    id="reservation_time"
                    type="time"
                    placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]{2}"
                    className="form-control mb-2"
                    required
                />
                <br />
                <label htmlFor="people">Guests:&nbsp;</label>
                <input
                    name="people"
                    id="people"
                    type="number"
                    min="1"
                    max="25"
                    className="m-3"
                    required
                />
                <br />
                <button type="submit" className="btn btn-dark mr-2 p-3">Submit</button>
                <button type="button" className="btn btn-danger p-3" onClick={history.goBack}>
                    Cancel
                </button>
            </form>
        </>
    )
}