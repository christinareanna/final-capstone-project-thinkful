const knex = require("../db/connection");
const tableName = "reservations";


function list() {
    return knex('reservations as r')
        .select('r.*')
        .orderBy('reservation_date')
        .orderBy('reservation_time');
}

function listByDate(date) {
    return knex('reservations as r')
        .select('r.*')
        .where({ reservation_date: date })
        .whereNot({ status: 'finished' })
        .orderBy('reservation_time')
}

function read(reservation_id) {
    return knex(tableName)
        .select('*')
        .where({ reservation_id: reservation_id })
        .first();
}

// function create(reservation) {
//     return knex(tableName).insert(reservation).returning("*");
// }

function create(reservation) {
    return knex(tableName)
        .insert(reservation, "*")
        .then((res) => res[0]);
}


// function updateStatus(updatedReservation) {
//     return knex('reservations')
//         .select('*')
//         .where({ reservation_id: updatedReservation.reservation_id })
//         .update({ status: updatedReservation.status })
//         .returning('*');
// }

async function updateReservation(reservation) {
    const {
        reservation_id,
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
    } = reservation;
    return knex('reservations')
        .where({ reservation_id })
        .update({
            first_name: first_name,
            last_name: last_name,
            mobile_number: mobile_number,
            reservation_date: reservation_date,
            reservation_time: reservation_time,
            people: people,
        }, [
            'first_name',
            'last_name',
            'mobile_number',
            'people',
            'reservation_date',
            'reservation_time',
        ])

}

function update(updatedReservation) {
    return knex('reservations')
        .select('*')
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, '*');
}

module.exports = {
    list,
    listByDate,
    read,
    create,
    updateReservation,
    update,
    // updateStatus,
}