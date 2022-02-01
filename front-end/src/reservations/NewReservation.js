import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";
import ReservationForm from "./ReservationForm";


export default function NewReservation() {
    const history = useHistory();
    const date = new Date();
    const [error, setError] = useState(null);
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: asDateString(date),
        reservation_time: date.toTimeString().slice(0,5),
        people: "",
    };


    const [form, setform] = useState({...initialFormState});

    // Handle submit form, calls createReservation and updates page with reservation date of the new reservation
    const handleSubmission = async (e) => {
        e.preventDefault()
        const AC = new AbortController()
        createReservation(form, AC.signal)
            .then(() => history.push(`/dashboard?date=${form.reservation_date}`))
            .catch(setError)
        // return () => AC.abort();
    }

    // handle change (with and without numbers). Updates the state of the form and values. 
    //Originally had combined into one handlechange but wanted to have it be read more easily.

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const handleNumberChange = (e) => {
        setform({
            ...form,
            [e.target.id]: Number(e.target.value),
        });
    };

    // Returns the reservation form with all of the props from this component.
    return (
        <div>
            <ReservationForm handleSubmission={handleSubmission} handleChange={handleChange} error={error} handleNumberChange={handleNumberChange} form={form} />
        </div>
    )
}