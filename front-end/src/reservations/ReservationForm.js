// import React from "react";
// import { useHistory } from "react-router";
// import ErrorAlert from "../layout/ErrorAlert";

// export default function ReservationForm({ handleChange, handleNumberChange, handleSubmission, formData, errors }) {
// const history = useHistory();

//     return (
//     <form onSubmit={handleSubmission} className="form-group">
//         <ErrorAlert error={errors} />
//         <div className="col-4 form-group">
//             <label className="form-label" htmlFor="first_name">
//                 First Name
//             </label>
//             <input
//                 className="form-control"
//                 id="first_name"
//                 name="first_name"
//                 placeholder="First Name"
//                 type="text"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.first_name}
//             />
//             <label className="form-label" htmlFor="last_name">
//                 Last Name
//             </label>
//             <input
//                 className="form-control"
//                 id="last_name"
//                 name="last_name"
//                 placeholder="Last Name"
//                 type="text"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.last_name}
//             />
//             <label className="form-label" htmlFor="mobile_number">
//                 Mobile Number
//             </label>
//             <input
//                 className="form-control"
//                 id="mobile_number"
//                 name="mobile_number"
//                 type="text"
//                 onChange={handleChange}
//                 required={true}
//                 placeholder="(xxx) xxx-xxxx"
//                 value={formData.mobile_number}
//             />
//             <label className="form-label" htmlFor="mobile_number">
//                 Party Size
//             </label>
//             <input
//                 className="form-control"
//                 id="people"
//                 min={1}
//                 name="people"
//                 type="number"
//                 onChange={handleNumberChange}
//                 required={true}
//                 value={formData.people}

//             />
//             <label>
//                 Reservation Date
//             </label>
//             <input
//                 className="form-control"
//                 id="reservation_date"
//                 name="reservation_date"
//                 type="date"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.reservation_date}
//             />
//             <label>
//                 Reservation Time
//             </label>
//             <input
//                 className="form-control"
//                 id="reservation_time"
//                 name="reservation_time"
//                 type="time"
//                 onChange={handleChange}
//                 required={true}
//                 value={formData.reservation_time}
//             />
//         <button type="button" onClick={() => history.goBack()} className="btn btn-secondary mr-2"> Cancel </button>
//         <button type="submit" className="btn btn-primary"> Submit Reservation </button>
//         </div>
//     </form >
//     )
// }


import React from 'react'
import { useHistory } from "react-router-dom"
import ErrorAlert from '../layout/ErrorAlert'
function ReservationForm({ handleSubmission, handleChange, handleNumberChange, form, error }) {
    const history = useHistory()

    
    return (
        <form onSubmit={handleSubmission}>
            <ErrorAlert error={error} />
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label"  >First Name</label>
                <input type="text" className="form-control" id="first_name" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Mobile Number</label>
                <input type="text" className="form-control" id="mobile_number" name="mobile_number" placeholder="Mobile Number" value={form.mobile_number} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Date</label>
                <input type="date" className="form-control" id="reservation_date" name="reservation_date" value={form.reservation_date} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Time</label>
                <input type="time" className="form-control" id="reservation_time" name="reservation_time" value={form.reservation_time} onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">People</label>
                <input type="number" className="form-control" id="people" name="people" value={form.people} onChange={handleNumberChange} min={1} required />
            </div>
            <div style={{ display: "flex" }}>
                <button onClick={(e) => {
                    e.preventDefault()
                    history.goBack()
                }}
                    className="btn btn-danger mr-3"
                >Cancel</button>
                <button type="submit" className="btn btn-success">Submit</button>
            </div>
        </form>
    )
}

export default ReservationForm