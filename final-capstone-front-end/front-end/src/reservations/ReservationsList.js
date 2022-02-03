import React from 'react';
import Reservation from './Reservation';

// Reservations from dashboard component
function ReservationList({ reservations }) {
    const currentReservations = reservations.filter((reservation) => reservation.status !== 'finished');
    const tableRows = currentReservations.map((reservation) => {
        return (
            // return Reservation component with each individual reservation
            <Reservation
                key={reservation.reservation_id}
                reservation={reservation}
            />
        );
    });
    // If there are reservations, return table of reservations, else, return 'No reservations found.' message.
    if (reservations.length) {
        return (
            <div className="container">
                <div className='row' style={{ justifyContent: "center" }}>
                    <div className="col col-2">
                        <table className="table">
                            <thead className="table-head" style={{ backgroundColor: "honeydew", opacity: "70%" }}>
                                <tr>
                                    <th scope="col">Guest</th>

                                    <th scope="col">Date &amp; Time</th>

                                    <th scope="col">Status</th>
                                    <th className="text-center" scope="col">
                                        Table Seating
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: "thistle", opacity: "80%", color: "black" }}>{tableRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div style={{ color: "black", fontSize: "20px" }}>No reservations found.</div>;
    }
}

export default ReservationList;