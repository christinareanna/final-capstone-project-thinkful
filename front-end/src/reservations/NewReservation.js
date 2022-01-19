import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createReservation, getReservation, updateReservation } from "../utils/api";
import { formatAsTime } from "../utils/date-time"
import ErrorAlert from "../layout/ErrorAlert";


export default function NewReservation({date}) {
    const history = useHistory();
    // const { reservation_id } = useParams();




    const [errors, setErrors] = useState(null);
    // const [reservation, setReservation] = useState({
    //     first_name: "",
    //     last_name: "",
    //     mobile_number: "",
    //     reservation_date: "",
    //     reservation_time: formatAsTime(new Date().toTimeString()),
    //     people: 0,
    // });

    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: date,
        reservation_time: "",
        people: "1",
    })



    function handleSubmit(event) {
        event.preventDefault();
        createReservation({
            ...reservation,
            people: Number(reservation.people),
        })
            .then(() => {
                history.push(`/dashboard?date=${reservation.reservation_date}`);
            })
            .catch(setErrors);
    }




    //TODO come back to update
    // useEffect(() => {
    //     if (reservation_id) {
    //         const abortController = new AbortController();
    //         setErrors(null);
    //         getReservation(reservation_id, abortController.signal)
    //             .then((data) => {
    //                 let updatedData = { ...data };
    //                 updatedData.reservation_time = formatAsTime(
    //                     updatedData.reservation_time
    //                 );
    //                 setReservation(updatedData);
    //             })
    //             .catch(setErrors);
    //         return () => abortController.abort();
    //     }
    // }, [reservation_id]);





    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     const abortController = new AbortController();
    //     try {
    //         if (reservation_id) {
    //             await updateReservation(formData, abortController.signal);
    //             history.push(`/dashboard?date=${formData.reservation_date}`);
    //             // setFormData({ ...initialFormState });
    //         } else {
    //             await createReservation(formData, abortController.signal);
    //             history.push(`/dashboard?date=${formData.reservation_date}`);
    //             // setFormData({ ...initialFormState }); 
    //         }
    //     } catch (err) {
    //         setErrors(err);
    //     }
    // };



    const handleChange = (event) => {
        setReservation({
            ...reservation,
            [event.target.name]:
                event.target.name === "people" ? Number(event.target.value) : event.target.value,
        });
    };



    return (
        <>
            <h1> Create A Reservation </h1>
            <ErrorAlert error={errors} />
            <form onSubmit={handleSubmit} className="form-group">
                <div className="row mb-3">
                    <div className="col-4 form-group">
                        <label className="form-label" htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={reservation.first_name}
                        />
                        <small className="form-text text-muted"> Enter First Name </small>
                    </div>
                    <div className="col-4">
                        <label className="form-label" htmlFor="last_name">
                            Last Name
                        </label>
                        <input
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            value={reservation.last_name}
                        />
                        <small className="form-text text-muted"> Enter Last Name </small>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4 form-group">
                        <label className="form-label" htmlFor="mobile_number">
                            Mobile Number
                        </label>
                        <input
                            className="form-control"
                            id="mobile_number"
                            name="mobile_number"
                            type="text"
                            onChange={handleChange}
                            required={true}
                            placeholder="(xxx) xxx-xxxx"
                            value={reservation.mobile_number}
                        />
                        <small className="form-text text-muted"> Enter Mobile Number </small>
                    </div>
                    <div className="col-4 form-group">
                        <label className="form-label" htmlFor="mobile_number">
                            Party Size
                        </label>
                        <input
                            className="form-control"
                            id="people"
                            name="people"
                            type="number"
                            onChange={handleChange}
                            required={true}
                            value={reservation.people}

                        />
                        <small className="form-text text-muted"> Enter Party Size </small>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4 form-group">
                        <label>
                            Reservation Date
                        </label>
                        <input
                            className="form-control"
                            id="reservation_date"
                            name="reservation_date"
                            type="date"
                            onChange={handleChange}
                            required={true}
                            value={reservation.reservation_date}
                        />
                        <small className="form-text text-muted"> Enter Reservation Date (Closed on Tuesdays) </small>
                    </div>
                    <div className="col-4 form-group">
                        <label>
                            Reservation Time
                        </label>
                        <input
                            className="form-control"
                            id="reservation_time"
                            name="reservation_time"
                            type="time"
                            onChange={handleChange}
                            required={true}
                            value={reservation.reservation_time}
                        />
                        <small className="form-text text-muted"> Enter Reservation Time </small>
                    </div>
                </div>
                <button type="button" onClick={() => history.goBack()} className="btn btn-secondary mr-2"> Cancel </button>
                <button type="submit" className="btn btn-primary"> Submit Reservation </button>
            </form>
        </>
    );
}