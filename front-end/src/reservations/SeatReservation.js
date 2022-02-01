import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { listTables, updateTable } from "../utils/api"
import ErrorAlert from '../layout/ErrorAlert'

export default function SeatReservation() {
    const history = useHistory()
    const { reservation_id } = useParams()
    const [tables, setTables] = useState([])
    const [chosenTable, setChosenTable] = useState({ table_id: null })
    const [error, setError] = useState(null)
    // const [reservation, setReservation] = useState({})
    useEffect(loadTables, [])
    // useEffect(loadReservationData,[reservation_id])

    // Calls listTables to show all of the tables
    function loadTables() {
        const AC = new AbortController();
        listTables(AC.signal)
            .then(setTables)
            .catch(setError);
        return () => AC.abort();
    }

    // Handle change to update the state of the table

    const handleChange = (e) => {
        setChosenTable({
            ...chosenTable,
            [e.target.id]: e.target.value,
        });

        // Handle submit to update the table with the reservation and go back to the dashboard page
    };
    const handleSubmission = async (e) => {
        e.preventDefault()
        setError(null)
        const abortController = new AbortController()
        updateTable({ reservation_id }, chosenTable.table_id, abortController.signal)
            .then(() => history.push("/"))
            .catch(setError)
        return () => abortController.abort();
    }

    // Map through all tables and show the table name and the capacity of each table in each option in the drop down menu when choosing a table to sit at

    const tableOptions = tables.map((table) => {
        return (<option key={table.table_id} value={table.table_id} >
            {table.table_name} - {table.capacity}
        </option>)
    })

    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error} />
            <div className="form-group">
                <label htmlFor="table_id">Choose a Table</label>
                <select className="form-control" id="table_id" name="table_id" onChange={handleChange}>
                    {/* Show 'No Selection' if you haven't chosen a table yet */} 
                    <option value="">No Selection</option>
                    {tables.length && tableOptions}
                </select>
            </div>
            <button onClick={(e) => {
                e.preventDefault()
                history.goBack()
            }}>Cancel</button>
            {/* if there is no table, disable the submit button */}
            <button type="submit" disabled={!chosenTable.table_id}>Submit</button>
        </form>
    )
}