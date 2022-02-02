import React from 'react';
import { useHistory } from 'react-router-dom';
import { updateResStatus } from '../utils/api';
// import "./Reservation.css"

// Reservation prop from ReservationsList component
function Reservation({ reservation }) {
    const history = useHistory();

    // Handle delete/cancel for reservation, changes status to cancelled, calls updateResState to update status
    function handleDelete() {
        const result = window.confirm(
            'Do you want to cancel this reservation? This cannot be undone.'
        );
        if (result) {
            const abortController = new AbortController();
            let status = 'cancelled';
            updateResStatus(
                status,
                reservation.reservation_id,
                abortController.signal
            ).then(() => {
                history.push('/');
            });
        }
    }

    // Shows name, number, how many people, date, time, and status of each reservation
    return (
        <tr className="table" key={reservation.reservation_id}>
            <td>
                {reservation.first_name} {reservation.last_name}
                <br />
                {reservation.mobile_number}
                <br />
                Party of {reservation.people}
            </td>
            <td>
                {reservation.reservation_date}
                <br />
                {reservation.reservation_time}
            </td>
            <td data-reservation-id-status={reservation.reservation_id}>
                {reservation.status}
            </td>
            {/* Return seat, edit, and cancel buttons only if a reservation says 'booked' */}
            {reservation.status === 'booked' ? (
                <>
                    <td className="text-center">
                        <a href={`/reservations/${reservation.reservation_id}/seat`}>
                            <button className="btn btn-info mr-2 mb-3">Seat</button>
                        </a>

                        <a href={`/reservations/${reservation.reservation_id}/edit`}>
                            <button className="btn btn-primary mr-2 mb-3">Edit</button>
                        </a>

                        <button
                            className="btn btn-danger mb-3"
                            data-reservation-id-cancel={reservation.reservation_id}
                            id={reservation.reservation_id}
                            onClick={handleDelete}
                        >
                            Cancel
                        </button>
                    </td>
                </>
            ) : (
                // else return null
                <td>{null}</td>
            )}
        </tr>
    );
}
export default Reservation;