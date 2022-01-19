import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";


function createTable() {

    const [table, setTable] = useState({
        "table_name": "",
        "capacity": "",
    });

    const history = useHistory();


    function handleChange(event) {
        setTable({
            ...table,
            [event.target.name]: event.target.value,
        })
    }

    function goHome() {
        history.push('/')
    }

    function goBack() {
        history.goBack()
    }

    async function submitHandler(event) {
        event.preventDefault()
        createTable(table)
            .then(() => {
                goHome()
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <main>
            <div>
                <form>
                    <label htmlFor='table_name'>
                        Table Name
                    </label>
                    <br />
                    <input
                        id="table_name"
                        type="text"
                        name="table_name"
                        value={table.table_name}
                        placeholder='Table Name'
                        onChange={handleChange}
                    />
                </form>
                <form>
                    <label htmlFor='capacity'>
                        Capacity
                    </label>
                    <br />
                    <input
                        id="capacity"
                        type="text"
                        name="capacity"
                        value={table.capacity}
                        placeholder='Capacity'
                        onChange={handleChange}
                    />
                </form>
                <button onClick={() => history.goBack()}>
                    Cancel
                </button>
                <button onClick={submitHandler}>
                    Submit
                </button>
            </div>
        </main>
    )
}

export default createTable;