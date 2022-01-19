// import React, { useEffect, useState } from "react";
// import { listReservations, getReservation, listTables } from "../utils/api";
// // import ErrorAlert from "../layout/ErrorAlert";
// import { previous, next, today } from "../utils/date-time";
// import { useHistory, useParams, useLocation } from "react-router-dom";
// import { formatAsTime } from "../utils/date-time"
// import Table from "../tables/Table"
// // import ReservationsList from "../reservations/ReservationsList";
// // import NewReservation from "../reservations/NewReservation";
// import useQuery from "../utils/useQuery";

// /**
//  * Defines the dashboard page.
//  * @param date
//  *  the date for which the user wants to view reservations.
//  * @returns {JSX.Element}
//  */
// function Dashboard() {
//   const query = useQuery();
//   const history = useHistory();
//   const [reservations, setReservations] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);
//   const [date, setDate] = useState(query.get("date") || today());


//   const { reservation_id } = useParams();


//   useEffect(loadDashboard, [date]);

//   let initialFormState = {
//     first_name: "",
//     last_name: "",
//     mobile_number: "",
//     reservation_date: "",
//     reservation_time: formatAsTime(new Date().toTimeString()),
//     people: 0,
//   };

//   const [formData, setFormData] = useState({ ...initialFormState });

//   // useEffect's to load reservations and tables

//   useEffect(() => {
//     const abortController = new AbortController();

//     async function loadReservations() {
//       try {
//         if (date) {
//           const returnedReservations = await listReservations({ date }, abortController.signal);
//           setReservations(returnedReservations);
//         }
//       } catch (error) {
//         setReservationsError(error);
//       }
//     }
//     loadReservations();
//     return () => abortController.abort();
//   }, [date, history.location])


//   useEffect(loadTables, [])

//   function loadTables() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listTables(abortController.signal).then(setTables).catch(setReservationsError);
//     return () => abortController.abort();
//   }

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);
//     return () => abortController.abort();
//   }


//   const handleDateChange = (event) => {
//     setDate(event.target.value);
//   }

//   useEffect(() => {
//     if (reservation_id) {
//       const abortController = new AbortController();
//       setReservationsError(null);
//       getReservation(reservation_id, abortController.signal)
//         .then((data) => {
//           let updatedData = { ...data };
//           updatedData.reservation_time = formatAsTime(
//             updatedData.reservation_time
//           );
//           setFormData(updatedData);
//         })
//         .catch(setReservationsError);
//       return () => abortController.abort();
//     }
//   }, [reservation_id]);

//   const handleChange = (event) => {
//     setTables(event.target.value);
//   }

//   if (reservations) {
//     return (
//       <main>
//         <h1>Dashboard</h1>
//         <div className="d-md-flex mb-3">
//           {/* <div className="header"> */}
//           <h4 className="mb-0">Reservations for date: {date}</h4>
//         </div>
//         <div className="text-center">
//           <label htmlFor="reservation_date" className="form-label mt-3 mr-2">
//             Search for a date:
//           </label>
//           <input
//             type="date"
//             pattern="\d{4}-\d{2}-\d{2}"
//             name="reservation_date"
//             onChange={handleDateChange}
//             value={date}
//           />
//         </div>
//         <Table onChange={handleChange}/>
//         {/* previous button */}
//         <div className="reservation-buttons" style={{ justifyContent: "center", width: "50%" }}>
//           <button
//             className="btn btn-info m-1 p-3"
//             onClick={() => history.push(`dashboard?date=${previous(date)}`)}
//           >
//             Previous
//           </button>
//           {/* today button */}
//           <button
//             className="btn btn-info m-1 p-3"
//             onClick={() => history.push(`dashboard?date=${today(date)}`)}
//           // disabled={isToday}
//           >
//             Today
//           </button>
//           {/* next button */}
//           <button
//             className="btn btn-info m-1 p-3"
//             onClick={() => history.push(`dashboard?date=${next(date)}`)}
//           >
//             Next
//           </button>
//           {/* <ErrorAlert error={reservationsError} /> */}
//         </div>
//         {/* {reservations.length > 0 ? (
//         <h1 className="text-center dashboard-section-header">Reservations</h1>
//       ) : (
//         <div className="text-center">
//           <h1 className="dashboard-section-header">No Reservations</h1>
//           <a href="reservations/new">
//             <button className="primary-btn" variant="contained" sx={{ mt: 1 }}>
//               Add A Reservation?
//             </button>
//           </a>
//         </div>
//       )}
//       <ReservationsList reservations={reservations} />

//       {/* TABLES */}
//         <h2 className="text-center dashboard-section-header">Tables</h2>
//         {/* add tables later? */}
//       </main>
//     );
//   }
// }

// export default Dashboard;





import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation, useHistory } from "react-router-dom";
import ReservationDetail from "../reservations/Reservation";
import Table from "../tables/Table";


function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);

  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const searchedDate = location.search.slice(-10);

  // function to know when to toggle column with clear tables button

  function clearTables(tables) {
    let result = [];
    tables.forEach((table) => {
      if (table.reservation_id) {
        result.push(table);
      }
    })
    return result;
  }
  let clearTableToggler = clearTables(tables);

  // useEffect's to load reservations and tables

  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservations() {
      try {
        if (currentDate === date) {
          const returnedReservations = await listReservations({ date }, abortController.signal);
          setReservations(returnedReservations);
        } else {
          const returnedReservations = await listReservations({ currentDate }, abortController.signal);
          setReservations(returnedReservations);
        }
      } catch (error) {
        setError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, [date, currentDate, history.location])

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      try {
        const returnedTables = await listTables();
        setTables(returnedTables);
      } catch (error) {
        setError(error);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, [history, date, currentDate])

  useEffect(() => {
    if (searchedDate && searchedDate !== '') {
      setCurrentDate(searchedDate);
    }
  }, [searchedDate, history]);

  // change day handlers

  const previousHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard');
    setCurrentDate(previous(currentDate));
  }

  const todayHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard');
    setCurrentDate(date);
  }

  const nextHandler = (event) => {
    event.preventDefault();
    history.push('/dashboard');
    setCurrentDate(next(currentDate));
  }

  if (reservations) {
    return (
      <main>
        <div className="mb-3">
          <h1>Dashboard</h1>
        </div>

        <div className="d-md-flex mb-3">
          <div className="row mb-3">
            <h4 className="ml-3">Reservations for date: {currentDate} </h4>
            <div className="">
              <button className="btn btn-primary ml-3" onClick={previousHandler}> Previous Day </button>
            </div>
            <div className="">
              <button className="btn btn-primary ml-3" onClick={todayHandler}> Today </button>
            </div>
            <div className="">
              <button className="btn btn-primary ml-3" onClick={nextHandler}> Next Day </button>
            </div>

          </div>
        </div>

        <ErrorAlert error={error} />
        <div>
          <h4> Reservation List </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> ID </th>
                <th scope="col"> First Name </th>
                <th scope="col"> Last Name </th>
                <th scope="col"> Party Size </th>
                <th scope="col"> Phone Number </th>
                <th scope="col"> Date </th>
                <th scope="col"> Time </th>
                <th scope="col"> Status </th>
                <th scope="col"> Seat </th>
                <th scope="col"> Edit </th>
                <th scope="col"> Cancel </th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <ReservationDetail res={res} key={res.reservation_id} />
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h4> Tables List </h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col"> ID </th>
                <th scope="col"> Table Name </th>
                <th scope="col"> Capacity </th>
                <th scope="col"> Reservation ID </th>
                <th scope="col"> Table Status </th>
                {clearTableToggler.length ?
                  <th scope="col"> Clear Tables </th>
                  :
                  <></>}
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <Table table={table} key={table.table_id} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  } else {
    return (
      <div>
        <h4> Dashboard Loading... </h4>
      </div>
    )
  }

}

export default Dashboard;