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


    // Handle submit that creates a new table and goes back to the dashboard
    const handleSubmit = async (e) => {
        e.preventDefault()
        const abortController = new AbortController()
        createTable(form, abortController.signal)
            .then(() => history.push("/"))
            .catch(setError)
        return () => abortController.abort();
    }



    // Handle changes and changes form depending on if it is a number or not

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
            <h1 style={{ width: "100%", margin: "30px 0" }}>Create A Table</h1>
            <ErrorAlert error={error} />
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='table_name' style={{ fontSize: "25px", marginBottom: "20px"  }}>
                        Table Name
                    </label>
                    <br />
                    <input
                        className="text-center"
                        style={{ width: "100%", marginBottom: "30px" }}
                        id="table_name"
                        type="text"
                        name="table_name"
                        value={form.table_name}
                        placeholder='Table Name'
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='capacity' style={{ fontSize: "25px", marginBottom: "20px"  }}>
                        Capacity
                    </label>
                    <input
                        className="text-center"
                        style={{ width: "100%", marginBottom: "30px" }}
                        id="capacity"
                        type="number"
                        name="capacity"
                        value={form.capacity}
                        placeholder='Capacity'
                        /* Minimum 1 person and used handle number change because capacity is numerical */
                        min={1}
                        onChange={handleNumber}
                        required
                    />
                    <button
                        className="btn btn-info"
                        style={{ margin: "10px" }}
                        // color="warning"
                        onClick={() => history.goBack()}>
                        Cancel
                    </button>
                    <button type="submit"
                        className="btn btn-info"
                        style={{ margin: "10px" }}>
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}