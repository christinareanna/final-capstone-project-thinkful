import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateReservation, listTables } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";




function Reservation({ res }) {
    // const [reservation, setReservation] = useState(res);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleCancelReservation = (reservation) => {
        // event.preventDefault();
        setError(null);
        const AC = new AbortController();
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            updateReservation({ ...reservation, status: "cancelled" },
                true,
                AC.signal)
                .then(() => {
                    listTables()
                    history.push("/dashboard");
                })
                .catch(setError)
        }
    }

    // useEffect(() => {
    //     setReservation(reservation);
    // }, [reservation, history])
    
    console.log(res)
    const reservationsRows = res.map((reservation) => {
        // console.log(reservation.reservation_id)
        const {reservation_id} = reservation
        return (
            // <key={reservation.reservation_id}>
            // <ErrorAlert error={error} />
            <tr key={reservation.reservation_id}>
                <th scope="row"> {reservation.reservation_id} </th>
                <td> {reservation.first_name} </td>
                <td> {reservation.last_name} </td>
                <td> {reservation.people} </td>
                <td> {reservation.mobile_number} </td>
                <td> {reservation.reservation_date} </td>
                <td> {reservation.reservation_time} </td>
                <td data-reservation-id-status={reservation.reservation_id}> {reservation.status} </td>
                {reservation.status === "booked" ?
                    <>
                        <td>

                            <a className="btn btn-primary"
                                href={`/reservations/${reservation_id}/seat`}>
                                seat
                                {/* <button className="btn btn-primary" type="button"> Seat</button> */}
                            </a>
                        </td>
                        <td>
                            <a href={`/reservations/${reservation_id}/edit`}>
                                <button className="btn btn-primary "> Edit </button>
                            </a>
                        </td>
                        <td data-reservation-id-cancel={reservation_id}>
                            <button className="btn btn-danger ml-2" onClick={() => handleCancelReservation(reservation)}> Cancel </button>
                        </td>
                    </> : <><td /><td /><td /></>
                }

            </tr>
            // </>
        )
    });
    return (
        <div>
            <h4> Reservation List </h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"> ID </th>
                        <th scope="col"> First Name </th>
                        <th scope="col"> Last Name </th>
                        <th scope="col"> Party Size </th>
                        <th scope="col"> Phone Number </th>
                        <th scope="col"> Date </th>
                        <th scope="col"> Time </th>
                        <th scope="col"> Status </th>
                        <th scope="col"> Seat </th>
                        <th scope="col"> Edit </th>
                        <th scope="col"> Cancel </th>
                    </tr>
                </thead>
                <tbody>
                    {reservationsRows}
                </tbody>
            </table>
        </div>
    )
}

export default Reservation;