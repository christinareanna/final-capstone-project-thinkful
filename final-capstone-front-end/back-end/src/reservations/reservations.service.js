const knex = require("../db/connection");

// List all reservations
function list() {
    return knex("reservations").select("*").orderBy("reservation_time");
}

// List all reservations by date
function listByDate(reservation_date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date })
        .whereNot({ status: "finished" })
        .whereNot({ status: "cancelled" })
        .orderBy("reservation_time");
}

// Read all reservations by id
function read(reservation_id) {
    return knex("reservations").select("*").where({ reservation_id }).first();
}

// Create a new reservation in "reservations"
function create(reservation) {
    return knex("reservations")
        .insert(reservation, "*")
        .then((res) => res[0]);
}

// Update reservation
function update(updatedReservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*")
        .then((res) => res[0]);
}

// Cancel reservations
function updateStatus(reservation_id, status) {
    return knex("reservations")
        .where({ reservation_id })
        .update({ status })
        .then(() => read(reservation_id));
}

// Delete a reservation
function destroy(reservation_id) {
    return knex("reservations").select("*").where({ reservation_id }).del();
}

// Search for numbers (mobile number)
function search(mobile_number) {
    return knex("reservations")
        .whereRaw(
            "translate(mobile_number, '() -', '') like ?",
            `%${mobile_number.replace(/\D/g, "")}%`
        )
        .whereNot({ status: "cancelled" })
        .orderBy("reservation_date");
}

module.exports = {
    listByDate,
    list,
    read,
    create,
    update,
    updateStatus,
    destroy,
    search,
};