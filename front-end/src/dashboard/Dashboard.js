import React, { useEffect, useState } from "react";
import { listTables, listReservations } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
// import { useHistory } from "react-router-dom";
// import ReservationsList from "../reservations/ReservationsList";
import Table from "../tables/Table";
import Reservation from "../reservations/Reservation";
// const dayjs = require("dayjs");


function Dashboard({ date }) {
  // function useQuery() {
  //   return new URLSearchParams(useLocation().search)
  // }
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);
  // const query = useQuery();
  // const [date, setDate] = useState(query.get("date") || today());
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  // const history = useHistory();
  // const location = useLocation();

  useEffect(loadDashboard, [date, currentDate]);
  useEffect(loadTables, []);
  // keeps url up to date even when using calendar input
  // useEffect(() => {
  //   history.push(`dashboard?date=${date}`);
  // }, [date, history]);




  function loadDashboard() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function loadTables() {
  //     try {
  //       const returnedTables = await listTables();
  //       setTables(returnedTables);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   }
  //   loadTables();
  //   return () => abortController.abort();
  // }, [history, date, currentDate])


  // const dateChangeHandler = (e) => {
  //   setDate(e.target.value);
  // };

  // const handlePreviousDate = () => {
  //   setDate(previous(date));
  //   history.push(`dashboard?date=${previous(date)}`);
  // };

  // const handleNextDate = () => {
  //   setDate(next(date));
  //   history.push(`dashboard?date=${next(date)}`);
  // };

  // const previousHandler = (event) => {
  //   event.preventDefault();
  //   history.push('/dashboard');
  //   setCurrentDate(previous(currentDate));
  // }

  // const todayHandler = (event) => {
  //   event.preventDefault();
  //   history.push('/dashboard');
  //   setCurrentDate(date);
  // }

  // const nextHandler = (event) => {
  //   event.preventDefault();
  //   history.push('/dashboard');
  //   setCurrentDate(next(currentDate));
  // }

  return (
    <main style={{ textAlign: "center" }}>
      {/* <div className="dashboard-header"> */}
      <h1 className="text-center">Dashboard</h1>
      <div className="mb-5">
        <h4 className="mb-0 text-center">
          Reservations for {currentDate}
        </h4>
        <div className="nav-btns">
          <button color="warning" sx={{ mr: 1 }} onClick={() => setCurrentDate(previous(currentDate))}> Previous </button>
          <button color="warning" onClick={() => setCurrentDate(today())}>Today </button>
          <button color="warning" onClick={() => setCurrentDate(next(currentDate))}>Next</button>
        </div>
      </div>
      {/* </div> */}
      <ErrorAlert error={error} />

      {/* <Reservation reservations={reservations} /> */}

      <div className="d-md-flex mb-3" style={{ flexDirection: "column", flex: "1" }}>
        {/* <h4 className="my-3">Reservations for {currentDate}</h4> */}
        <Reservation reservations={reservations} />
      </div>

      <div className="d-md-flex mb-3" style={{ flexDirection: "column" }}>
        <h4 className="my-3">Tables</h4>
        <Table tables={tables} />
      </div>
    </main >
  );
}
export default Dashboard;

/* calendar */ 
/* 
          <div className="text-center">
            <label htmlFor="reservation_date" className="form-label mt-3 mr-2">
              Search for a date:
            </label>
            <input
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              name="reservation_date"
              onChange={dateChangeHandler}
              value={date}
            />
          </div> */
