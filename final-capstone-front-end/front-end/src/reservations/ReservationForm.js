import React from 'react'
import { useHistory } from "react-router-dom"
import ErrorAlert from '../layout/ErrorAlert'
function ReservationForm({ handleSubmission, handleChange, handleNumberChange, form, error }) {
    const history = useHistory()

    
    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error} />
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label" style={{fontSize: "25px"}}>First Name</label>
                <input type="text" className="text-center" id="first_name" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label" style={{fontSize: "25px"}}>Last Name</label>
                <input type="text" className="text-center" id="last_name" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="mobile_number" className="form-label" style={{fontSize: "25px"}}>Mobile Number</label>
                <input type="text" className="text-center" id="mobile_number" name="mobile_number" placeholder="Mobile Number" value={form.mobile_number} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="reservation_date" className="form-label" style={{fontSize: "25px"}}>Date</label>
                <input type="date" className="text-center" id="reservation_date" name="reservation_date" value={form.reservation_date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="reservation_time" className="form-label" style={{fontSize: "25px"}}>Time</label>
                <input type="time" className="text-center" id="reservation_time" name="reservation_time" value={form.reservation_time} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="people" className="form-label" style={{fontSize: "25px"}}>People</label>
                <input type="number" className="text-center" id="people" name="people" value={form.people} onChange={handleNumberChange} min={1} required />
            </div>
            <div style={{ textAlign: "center"}}>
                <button onClick={(e) => {
                    e.preventDefault()
                    history.goBack()}}
                    className="btn btn-info mr-3"
                >Cancel</button>
                <button type="submit" className="btn btn-info">Submit</button>
            </div>
        </form>
    )
}

export default ReservationForm