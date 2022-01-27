import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
    const [error, setError] = useState(null);
    const history = useHistory();

    const initialFormState = {
        table_name: "",
        capacity: "",
    };
    const [form, setForm] = useState({ ...initialFormState });


    const handleSubmit = async (e) => {
        e.preventDefault()
        const AC = new AbortController()
        createTable(form, AC.signal)
            .then(() => history.push("/"))
            .catch(setError)
        return () => AC.abort();
    }




    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };


    const handleNumber = (event) => {
        setForm({
            ...form,
            [event.target.id]: Number(event.target.value),
        });
    };




    return (
        <main>
            <h1>Create A Table</h1>
            <ErrorAlert error={error} />
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='table_name'>
                        Table Name
                    </label>
                    <br />
                    <input
                        id="table_name"
                        type="text"
                        name="table_name"
                        value={form.table_name}
                        placeholder='Table Name'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='capacity'>
                        Capacity
                    </label>
                    <input
                        id="capacity"
                        type="number"
                        name="capacity"
                        value={form.capacity}
                        placeholder='Capacity'
                        min={1}
                        onChange={handleNumber}
                        required
                    />
                    <button
                        color="warning"
                        onClick={() => history.goBack()}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}