import React, { useState } from "react";
// import ErrorAlert from "../layout/ErrorAlert";

export default function Search() {


    return (
        <form name="search">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="mobile_number"
                    placeholder="Enter phone number"
                // onChange={handleChange}
                // value={mobileNumber}
                ></input>
                <button type="submit" className="btn btn-info">
                    Find
                </button>
            </div>
        </form>
    )
}