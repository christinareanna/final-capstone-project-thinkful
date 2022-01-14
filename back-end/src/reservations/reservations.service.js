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

function create(reservation) {
    return knex(tableName).insert(reservation).returning("*");
}

function update(updatedReservation) {
    return knex('reservations')
        .select('*')
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, '*');
}

function updateStatus(updatedReservation) {
    return knex('reservations')
        .select('*')
        .where({ reservation_id: updatedReservation.reservation_id })
        .update({ status: updatedReservation.status })
        .returning('*');
}


module.exports = {
    list,
    listByDate,
    read,
    create,
    update,
    updateStatus,
}