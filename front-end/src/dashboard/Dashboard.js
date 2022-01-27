import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation, useHistory } from "react-router-dom";
import Reservation from "../reservations/Reservation";
// import Table from "../tables/Table";


function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);

  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const searchedDate = location.search.slice(-10);

  // clear tables function 

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

  // load reservations and tables

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
        <Reservation res={reservations}/>

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
                {/* <Table tables={tables}/> */}
            </tbody>
          </table>
        </div>
      </main>
    );
  } else {
    return (
      <div>
        <h4> Dashboard Loading. </h4>
      </div>
    )
  }

}

export default Dashboard;