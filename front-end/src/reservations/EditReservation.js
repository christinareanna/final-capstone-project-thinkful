import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { updateReservation, readReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./ReservationForm";


export default function EditReservation() {
    const history = useHistory();
    const [error, setError] = useState(null);
    const { reservation_id } = useParams();
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    };


    const [form, setForm] = useState(initialFormState);

    useEffect(loadReservation, [reservation_id])

    function loadReservation() {
        const abortController = new AbortController();
        setError(null);
        readReservation(reservation_id, abortController.signal)
            .then(setForm)
            .catch(setError);
        return () => abortController.abort();
    }


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
        console.log(form)
    };
    const handleNumberChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: Number(e.target.value),
        });
    };
    const handleSubmission = async (e) => {
        e.preventDefault()
        const AC = new AbortController()
        updateReservation(form, AC.signal)
            .then(() => history.push(`/dashboard?date=${form.reservation_date}`))
            .catch(setError)
        return () => AC.abort();
    }
    if (form.first_name) {
        form.reservation_date = formatAsDate(form.reservation_date)
    }




    // const handleChange = (event) => {
    //     setForm({
    //         ...form,
    //         [event.target.name]:
    //             event.target.name === "people" ? Number(event.target.value) : event.target.value,
    //     });
    // };



    return (
        <div>
            <ReservationForm handleSubmission={handleSubmission} handleChange={handleChange} error={error} handleNumberChange={handleNumberChange} form={form} />
        </div>
    );
}